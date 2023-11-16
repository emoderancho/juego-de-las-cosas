import React from 'react';
import { Container } from 'react-bootstrap';

function ScoreScreen() {
  const question = "Cosas que los perros en realidad están diciendo cuando ladran";
  const answers = [
    { text: "¡Soy el mejor perro del mundo!", player: "Jugador 1", correct: true },
    { text: "¡Quiero jugar contigo!", player: "Jugador 2", correct: false },
    { text: "¡Cuidado, hay un cartero afuera!", player: "Jugador 3", correct: false }
  ];

  const funniestPlayer = "Jugador 3";
  const funniestAnswer = answers.find(answer => answer.player === funniestPlayer).text;

  return (
    <Container>
      <h1>Puntuación</h1>
      <h2>Pregunta:</h2>
      <p>{question}</p>
      <h2>Respuestas:</h2>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            {answer.text} del {answer.player} ({answer.correct ? "Correcto" : "Incorrecto"})
          </li>
        ))}
      </ul>
      <h2>Respuesta Más Chistosa:</h2>
      <p>El jugador más chistoso es: {funniestPlayer} con la respuesta {funniestAnswer}</p>
    </Container>
  );
}

export default ScoreScreen;





