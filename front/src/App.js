/*Import Components*/
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'

/* Import Socket.io Client */
import { useSocket } from './context/SocketContext'; // Importa el contexto

/* Import Custom Components*/
import { Navbar } from './components';

/* Import CSS */
import './App.css';

/*Import Screens*/
import LobbyScreen from './screens/LobbyScreen';
import WaitingRoomScreen from './screens/WaitingRoomScreen';
import NarratorScreen from './screens/NarratorScreen';
import WaitForNarratorScreen from './screens/WaitingForNarratorScreen';
import AnswerScreen from './screens/AnswerScreen';
import ReadAnswersScreen from './screens/ReadAnswersScreen';
import GuessingScreen from './screens/GuessingScreen';
import VotingScreen from './screens/VotingScreen';
import ScoreScreen from './screens/ScoreScreen';
import EndGameScreen from './screens/EndGameScreen';

/* React Code */
function App() {

  const socket = useSocket()
  const navigate = useNavigate()

  const [copied, setCopied] = useState(false)

  const handleRoomCodeClick = () => {
    navigator.clipboard.writeText(roomCode)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const roomCode = pathSegments[2]; // Assuming the room code is at the third position

  const [showReconnectModal, setShowReconnectModal] = useState(false)

  const handleReconnect = () => {
    setShowReconnectModal(false)
  }

  const handleGoToHomepage = () => {
    setShowReconnectModal(false)
  }

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('new socket id: ', socket.id)
        socket.emit('new-user', {usuario: socket.id})

        const storedUsername = Cookies.get('username')
        const storedSocketID = Cookies.get('socketID')
        const storedRoomCode = Cookies.get('roomcode')

        if (storedUsername && storedSocketID && storedRoomCode) {
          socket.emit('get-room-reconnect-info', {room: storedRoomCode, socketID: socket.id, username: storedUsername, storedSocketID: storedSocketID}, (response) => {
            if (response.reconnect === 'ok') {
              console.log('reconectando')
              navigate(`/waiting-room/${storedRoomCode}`)
            }
          })
        }

        Cookies.set('socketID', socket.id, {expires: 0.00347})

      })

    }
  }, [socket, Cookies])

  return (
    <Container className='App'>
      <Navbar title="Juego" roomCode={roomCode} copeid={copied}/>
      <Container>

      <Modal show={showReconnectModal} onHide={() => setShowReconnectModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reconectar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Parece que estabas en una sala. ¿Te gustaría reconectarte?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleReconnect}>
            Reconectar
          </Button>
          <Button variant="secondary" onClick={handleGoToHomepage}>
            Volver a la página principal
          </Button>
        </Modal.Footer>
      </Modal>

        <Routes>
          <Route exact path="/" element={<LobbyScreen/>} />
          <Route path="/waiting-room/*" element={<WaitingRoomScreen/>} />
          <Route path="/narrator/*" element={<NarratorScreen/>} />
          <Route path="/waiting-for-narrator/*" element={<WaitForNarratorScreen/>} />
          <Route path="/writing-answers/*" element={<AnswerScreen/>} />
          <Route path="/read-answers/*" element={<ReadAnswersScreen/>} />
          <Route path="/guessing/*" element={<GuessingScreen/>} />
          <Route path="/voting/*" element={<VotingScreen/>} />
          <Route path="/score/*" element={<ScoreScreen/>} />
          <Route path="/end-game/*" element={<EndGameScreen/>} />
          {/* Agrega rutas adicionales según las necesidades de tu aplicación */}
          </Routes>
      </Container>
    </Container>
  );
}

export default App;
