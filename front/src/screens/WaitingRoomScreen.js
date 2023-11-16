import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { Card, Button, Stack, Badge } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { UsersDisplay } from '../components';

function WaitingRoomScreen() {
  const socket = useSocket()
  const [users, setUsers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  const roomCode = useLocation().pathname.split('/')[2]

  useEffect(() => {
    if (socket) {
      socket.emit('get-room-info', {room: roomCode, socket: socket.id})
      // Escucha eventos para actualizar la lista de usuarios
      socket.on('room-info', (roomInfo) => {
        //Recibe el userlist y lo pasa a una variable local
        setUsers(Object.values(roomInfo.users))
        console.log('info recibida')
      });

      socket.on('connect', () => {
        console.log(socket.id)
        socket.emit('get-room-info', {room: roomCode, socketID: socket.id}, (response) => {
          if (!response.roomExists) {
            console.log('la sala no existe')
            navigate('/')
          }
        })
      })

    }

    return () => {
      if (socket) {
        // Deja de escuchar eventos al desmontar el componente
        socket.off('room-info');
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const currentUser = users.find((user) => user.id === socket.id)
      setIsAdmin(currentUser ? currentUser.isAdmin : false) 

    }

    if (!roomCode) {
      navigate('/')
    }

  }, [users, socket])

  return (
    <div>
      <h1>Waiting Room</h1>
      <Stack gap={2}>
        <UsersDisplay isAdmin={isAdmin} users={users}/>
        
      {isAdmin && users.length >= 4 ? (
        <Link to={`/next-screen/roomcode`}>
          <Button variant="primary">Comenzar Juego</Button>
        </Link>
      ) : !isAdmin && users.length >= 4 ? (
        <p>Esperando a que el administrador comience el juego.</p>
      ) : (
        <p>Esperando a que se unan al menos 4 personas</p>
      )}
      </Stack>
    </div>
  );
}

export default WaitingRoomScreen;