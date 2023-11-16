import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

function EndGameScreen() {
  const players = [
    { name: "Jugador 1", score: 5 },
    { name: "Jugador 2", score: 7 },
    { name: "Jugador 3", score: 8 }
  ];

  return (
    <Container>
      <h1>Fin de la Partida</h1>
      <h2>Puntaje de Jugadores:</h2>
      <ListGroup>
        {players.map((player, index) => (
          <ListGroup.Item key={index}>
            {player.name}: {player.score} puntos
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="primary">Terminar la Partida</Button>
      <Button variant="success">Jugar Otra Ronda</Button>
    </Container>
  );
}

export default EndGameScreen;