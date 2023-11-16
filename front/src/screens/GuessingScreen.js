import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

function GuessingScreen() {
  const question = "Cosas que los perros en realidad están diciendo cuando ladran";
  const answers = [
    "¡Soy el mejor perro del mundo!",
    "¡Quiero jugar contigo!",
    "¡Cuidado, hay un cartero afuera!"
  ];

  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [playerGuesses, setPlayerGuesses] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const players = ["Jugador 1", "Jugador 2", "Jugador 3"]; // Lista de jugadores

  useEffect(() => {
    // Verificar si se han realizado conjeturas para todas las respuestas
    if (playerGuesses.length === answers.length) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }, [playerGuesses, answers]);

  // Función para manejar la selección de un jugador para una respuesta
  const handlePlayerSelection = (player) => {
    setSelectedPlayer(player);
  };

  // Función para avanzar a la siguiente respuesta
  const showNextAnswer = () => {
    if (currentAnswerIndex < answers.length - 1) {
      setCurrentAnswerIndex(currentAnswerIndex + 1);
      setSelectedPlayer(null);
    }
  };

  // Función para volver a la respuesta anterior
  const showPreviousAnswer = () => {
    if (currentAnswerIndex > 0) {
      setCurrentAnswerIndex(currentAnswerIndex - 1);
      setSelectedPlayer(null);
    }
  };

  return (
    <Container>
      <h1>Adivinanza</h1>
      <h2>Pregunta:</h2>
      <p>{question}</p>
      <h2>Respuesta {currentAnswerIndex + 1} de {answers.length}:</h2>
      <ListGroup>
        <ListGroup.Item>{answers[currentAnswerIndex]}</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" onClick={showPreviousAnswer} disabled={currentAnswerIndex === 0}>
        Respuesta Anterior
      </Button>
      <Button variant="primary" onClick={showNextAnswer} disabled={currentAnswerIndex === answers.length - 1}>
        Siguiente Respuesta
      </Button>
      <h2>Selecciona un jugador para esta respuesta:</h2>
      <ListGroup>
        {players.map((player) => (
          <Button
            key={player}
            variant={selectedPlayer === player ? "success" : "outline-primary"}
            onClick={() => handlePlayerSelection(player)}
          >
            {player}
          </Button>
        ))}
      </ListGroup>
      <Button
        variant="primary"
        onClick={() => {
          setPlayerGuesses([...playerGuesses, selectedPlayer]);
        }}
        disabled={!selectedPlayer}
      >
        Guardar Conjetura
      </Button>
      <Button
        variant="success"
        onClick={showNextAnswer}
        disabled={isSubmitButtonDisabled}
      >
        Enviar Respuestas
      </Button>
    </Container>
  );
}

export default GuessingScreen;