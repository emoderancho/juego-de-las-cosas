import React, { useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

function ReadAnswersScreen() {
  const question = "Cosas que los perros en realidad están diciendo cuando ladran";
  const answers = [
    "¡Soy el mejor perro del mundo!",
    "¡Quiero jugar contigo!",
    "¡Cuidado, hay un cartero afuera!"
  ];

  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);

  // Función para mostrar la siguiente respuesta
  const showNextAnswer = () => {
    if (currentAnswerIndex < answers.length - 1) {
      setCurrentAnswerIndex(currentAnswerIndex + 1);
    }
  };

  const isLastAnswer = currentAnswerIndex === answers.length - 1;

  // Función para ir a la siguiente pantalla
  const goToNextScreen = () => {
    // Implementa la lógica para avanzar a la siguiente pantalla aquí
  };

  return (
    <Container>
      <h1>Lectura de Respuestas</h1>
      <h2>Pregunta:</h2>
      <p>{question}</p>
      <h2>Respuesta {currentAnswerIndex + 1} de {answers.length}:</h2>
      <ListGroup>
        <ListGroup.Item>{answers[currentAnswerIndex]}</ListGroup.Item>
      </ListGroup>
      {isLastAnswer ? (
        <Button variant="primary" onClick={goToNextScreen}>
          Ir a la Siguiente Pantalla
        </Button>
      ) : (
        <Button variant="primary" onClick={showNextAnswer}>
          Siguiente Respuesta
        </Button>
      )}
    </Container>
  );
}

export default ReadAnswersScreen;