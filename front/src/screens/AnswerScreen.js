import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function AnswerScreen() {
  const [answer, setAnswer] = useState('');

  // Función para enviar la respuesta
  const sendAnswer = () => {
    // Implementa la lógica para enviar la respuesta aquí
  };

  return (
    <Container>
      <h1>Pantalla de Respuestas</h1>
      <Form>
        <Form.Group>
          <Form.Label>Ingresa tu respuesta:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={sendAnswer}>
          Enviar Respuesta
        </Button>
      </Form>
    </Container>
  );
}

export default AnswerScreen;