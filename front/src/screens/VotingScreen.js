import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

function VotingScreen() {
  const question = "Cosas que los perros en realidad están diciendo cuando ladran";
  const answers = [
    "¡Soy el mejor perro del mundo!",
    "¡Quiero jugar contigo!",
    "¡Cuidado, hay un cartero afuera!"
  ];

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  useEffect(() => {
    setIsSubmitButtonDisabled(selectedAnswerIndex === -1);
  }, [selectedAnswerIndex]);

  // Función para manejar la selección de una respuesta
  const selectAnswer = (index) => {
    setSelectedAnswerIndex(index);
  };

  // Función para enviar la respuesta
  const submitAnswer = () => {
    // Implementa la lógica para enviar la respuesta seleccionada
  };

  return (
    <Container>
      <h1>Votación</h1>
      <h2>Pregunta:</h2>
      <p>{question}</p>
      <h2>Respuestas:</h2>
      <div>
        {answers.map((answer, index) => (
          <Button
            key={index}
            variant={selectedAnswerIndex === index ? "success" : "outline-primary"}
            onClick={() => selectAnswer(index)}
          >
            {answer}
          </Button>
        ))}
      </div>
      <Button
        variant="primary"
        onClick={submitAnswer}
        disabled={isSubmitButtonDisabled}
      >
        Enviar Respuesta
      </Button>
    </Container>
  );
}

export default VotingScreen;