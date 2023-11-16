import React, { useState, useEffect } from 'react'
import { Stack, Container, InputGroup, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { ErrorModal, Button, Input } from '../components'

import { useSocket } from '../context/SocketContext' // Importa el contexto

function LobbyScreen() {

  const socket = useSocket()

  const [username, setUsername] = useState('')
  const [showCreateRoom, setShowCreateRoom] = useState(true)
  const [showJoinRoom, setShowJoinRoom] = useState(false)
  const [roomCode, setRoomCode] = useState('')
  const navigate = useNavigate()

  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState ('')
  const [reconnect, setReconnect] = useState(false)


  const handleUsernameChange = (e) => {
    const inputValue = e.target.value
    const validUsername = inputValue.replace(/[^a-z0-9_\-]/g, '')
    setUsername(validUsername)
    Cookies.set('username', validUsername, {expires: 0.00347})
  }

  // Función para generar un código de sala aleatorio
  const generateRoomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      code += characters[randomIndex]
    }
    // Aquí puedes realizar cualquier lógica adicional, como guardar el código en el servidor.
    return code
  }

  // Función para unirse a una sala con el código ingresado
  const joinRoom = () => {
    if (roomCode.length === 4) {
      socket.emit('join-room', {
        username: username,
        room: roomCode,
        isAdmin: false,
        requestType: 'join'
      }, (response) => {
        switch (response.joinStatus) {
          case 'username-taken':
            console.log('username taken')
            setErrorMessage('El nombre de usuario ya está en uso. Por favor, elige otro.')
            setShowErrorModal(true)
            break
          
          case 'room-not-found':
            console.log('room not found')
            setErrorMessage('La sala no existe. Por favor, verifica el código de la sala.')
            setShowErrorModal(true)
            break
          
          case 'join-room':
            navigate(`/waiting-room/${roomCode}`)
            break
          
          case 'reconnect':
            console.log('reconectar')
            setErrorMessage('Este usuario se desconecto, Deseas reconectar?')
            setReconnect(true)
            setShowErrorModal(true)
            break
        }
      })
    }
  }

  return (
    <Container>
      <h1>Lobby</h1>
      <Stack gap={2}>
        <Input 
        description='Ingresa tu nombre (máximo 10 caracteres)'
        maxLength='12'
        value={username}
        onChange={handleUsernameChange}
        placeholder='nombre de usuario'
        inputType='username'
        />
        {showCreateRoom && (
          <Button
            variant="primary"
            onClick={() => {
              if (username.length > 4) {
                const roomCode = generateRoomCode()
              
                socket.emit('join-room', {
                  username: username,
                  room: roomCode,
                  isAdmin: true,
                  requestType: 'create'
                }, (response) => {
                  if (response.joinStatus === 'create-room') {
                    Cookies.set('roomcode', roomCode, {expires: 0.00347})
                    navigate(`/waiting-room/${roomCode}`)
                  }
                })
                // Aquí puedes realizar cualquier lógica adicional, como guardar el código en el servidor.
              }
            }}
          >
            Crear Nueva Sala
          </Button>
        )}
        {showCreateRoom && (
          <Button
          variant="secondary"
          onClick={() => {
            setShowCreateRoom(false)
            setShowJoinRoom(true)
          }}
          >
            Unirse a una Sala
          </Button>
        )}

        <ErrorModal
          show={showErrorModal}
          onHide={() => setShowErrorModal(false)}
          errorMessage={errorMessage}
          reconnect={reconnect}
        />

        {showJoinRoom && (
          <div>
            <Input
              placeholder='Codigo de Sala'
              maxLength='4'
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            >
            </Input>
            <Stack gap={2}>
              <Button variant="primary" onClick={joinRoom}>
                Unirse a la Sala
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowCreateRoom(true)
                  setShowJoinRoom(false)
                }}
              >
                Atrás
              </Button>
            </Stack>
          </div>
        )}
      </Stack>
    </Container>
  )
}

export default LobbyScreen
