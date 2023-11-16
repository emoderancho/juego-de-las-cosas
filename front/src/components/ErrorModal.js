import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ show, onHide, errorMessage, reconnect }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{errorMessage}</Modal.Body>
      <Modal.Footer>
        {reconnect && (
          <Button
            variant='primary'
            onclick={console.log('reconectar')}
            >
              Reconectar
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;