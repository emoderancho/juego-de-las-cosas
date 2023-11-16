import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

function WaitForNarratorScreen() {
  return (
    <Container>
      <h1>Esperando al Narrador</h1>
      <p>Por favor, espera mientras el narrador escribe la pregunta.</p>
      <Spinner animation="border" role="status">
        <span className="sr-only">Cargando...</span>
      </Spinner>
    </Container>
  );
}

export default WaitForNarratorScreen;





