import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirmFinish = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Finish Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to finish the quiz? You cannot change your answers after finishing.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Finish Quiz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmFinish;
