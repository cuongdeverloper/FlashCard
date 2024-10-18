import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteFlashCard = (props) =>{
    const {show, setShow,dataRemove,handleDeleteQuestion,setDataRemove} = props

    const handleClose = () => {
        setShow(false);
        setDataRemove(''); 
    };

const handleConfirmRemove = async()=>{
    handleDeleteQuestion();
    handleClose()
} 
  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Remove {dataRemove.questionText} - Id:{dataRemove._id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmRemove}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDeleteFlashCard