const http = require('http');
const { runInThisContext } = require('vm');

const server = http.createServer()

const io = require('socket.io')(server, {
    cors: {origin: '*'}
})

class Room {
    constructor(roomCode) {
        this.roomCode = roomCode;
        this.users = {}; // Almacena los usuarios en esta sala
        this.questions = []; // Almacena las preguntas
        this.answers = {}; // Almacena las respuestas
        this.guesses = {}; // Almacena las conjeturas
        this.points = {}; // Almacena los puntos
        this.gameConfig = {}; // Almacena la configuración del juego
        this.currentRoom = 'lobby'
    }

    addUser(userId, userName, isAdmin) {
        this.users[userId] = { id: userId, username: userName, isAdmin, status: 'connected'}
    }

    removeUser(userId) {
        delete this.users[userId]
    }

    reassignUser(userID, newUserID) {
        if (this.users[userID].status === 'waitingForReconnect') {
            this.users[newUserID] = { ...this.users[userID], id: newUserID, status: 'connected'} 
            delete this.users[userID]
        }
        
    }
}

const rooms = {}

io.on('connection', (socket) => {

    //Escucha cuando un nuevo cliente entra a la pagina
    socket.on('new-user', (data) => {
        console.log('Se unio el usuario ' + data.usuario)
    })

    //Escucha cuando un usuario crea un room
    socket.on('join-room', (data, callback) => {

        if (data.requestType === 'create') {
            if (!rooms[data.room]) {
                rooms[data.room] = new Room(data.room)
                console.log('Se creo una nueva sala con el codigo: ' + data.room)
                callback({joinStatus: 'create-room'})
            }

            socket.join(data.room)

            rooms[data.room].addUser(socket.id, data.username, data.isAdmin)

            //io.to(data.room).emit('user-list', Object.values(rooms[data.room].users))

        } else if (data.requestType === 'join') {
            if (rooms[data.room]) {
                const isUsernameTaken = Object.values(rooms[data.room].users).some((user) => user.username === data.username)

                if (isUsernameTaken) {
                    const usersInRoom = Object.values(rooms[data.room].users)

                    const userFound = usersInRoom.find((user) => user.username === data.username) 

                    if (userFound.status === 'waitingForReconnect') {
                       callback({joinStatus: 'reconnect'})
                    } else {
                        callback({joinStatus: 'username-taken'})
                    }
                } else {
                    console.log('uniendote a la sala')
                    callback({joinStatus: 'join-room'})
                    socket.join(data.room)
                    rooms[data.room].addUser(socket.id, data.username, data.isAdmin)
                    io.emit('go-to-room', data.room)
                }
            } else {
                callback({joinStatus: 'room-not-found'})
            }
        }

        socket.on('get-room-info', (data) => {
            io.to(data.room).emit('room-info', rooms[data.room])
        })

        socket.on('disconnect', () => {
            const room = Object.keys(rooms).find((room) => socket.id in rooms[room].users);

            if (room) {
                rooms[room].users[socket.id].status = 'waitingForReconnect'

                if (rooms[room].users[socket.id].isAdmin === true && Object.keys(rooms[room].users).length > 1) {
                    const usersInRoom = rooms[room] ? Object.values(rooms[room].users) : []
                    const secondUser = usersInRoom[1]

                    rooms[room].users[socket.id].isAdmin = false
                    rooms[room].users[secondUser.id].isAdmin = true

                }

                io.to(room).emit('room-info', rooms[room])

                setTimeout(() => {
                    if (rooms[room].users[socket.id].status === 'waitingForReconnect') {
                        rooms[room].removeUser(socket.id)
                        io.to(room).emit('room-info', rooms[room])
                    }
                }, 5 * 60 * 1000)
            }
        })

    })

    socket.on('get-room-reconnect-info', (data, callback) => {
        if (rooms[data.room]) {
            if (rooms[data.room].users[data.storedSocketID]) {
                if (rooms[data.room].users[data.storedSocketID]. status === 'waitingForReconnect') {
                    rooms[data.room].reassignUser(data.storedSocketID, data.socketID)
                    socket.join(data.room)
                    callback({reconnect: 'ok'})
                    io.to(data.room).emit('room-info', rooms[data.room])
                }
            }
        }
    })
    
    socket.on('get-room-info', (data , callback) => {
        // Verifica si la sala existe y si el socketId es parte de la sala
        if (typeof callback === 'function') {
            if(!rooms[data.room]) {
                callback({roomExists: false})
            } else {
                if(!rooms[data.room].users[data.socketID]) {
                    callback({roomExists: false})
                }
            }
        }
      });
    
})

server.listen(3000)