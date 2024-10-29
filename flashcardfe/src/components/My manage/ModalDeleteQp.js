import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ModalDeleteQp = (props) => {
    const { show, setShow, handleRemoveQp } = props;
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleClose = () => setShow(false);

    const handleCheckboxChange = () => setIsConfirmed(!isConfirmed);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        I will not close if you click outside me. Do not even try to press
                        escape key.
                    </p>
                    <Form.Check 
                        type="checkbox" 
                        label="I confirm that I want to delete this item." 
                        onChange={handleCheckboxChange} 
                        checked={isConfirmed} 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleRemoveQp} 
                        disabled={!isConfirmed}
                    >
                        Understood
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteQp;
