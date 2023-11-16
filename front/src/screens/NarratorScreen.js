import React, { useState } from 'react';
import { Stack, Container, Form, Button } from 'react-bootstrap';

function NarratorScreen() {
  const [question, setQuestion] = useState('');

  // Función para enviar la pregunta
  const sendQuestion = () => {
    // Implementa la lógica para enviar la pregunta aquí
  };

  return (
    <Container>
      <h1>Pantalla del Narrador</h1>
      <Form>
        <Stack gap={2}>
          <Form.Group>
            <Form.Label>Ingresa tu pregunta:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={sendQuestion}>
            Enviar Pregunta
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}

export default NarratorScreen;