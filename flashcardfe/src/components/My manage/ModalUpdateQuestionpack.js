import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalUpdateQuestionPack = ({ show, handleClose, handleUpdateQuestionPack, qpForm, handleQpFormChange, imagePreview, setImagePreview }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Question Pack</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={qpForm.title}
                            onChange={handleQpFormChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={qpForm.description}
                            onChange={handleQpFormChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formIsPublic">
                        <Form.Check
                            type="checkbox"
                            label="Is Public"
                            name="isPublic"
                            checked={qpForm.isPublic}
                            onChange={handleQpFormChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSemester">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control
                            type="text"
                            name="semester"
                            value={qpForm.semester}
                            onChange={handleQpFormChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            name="subject"
                            value={qpForm.subject}
                            onChange={handleQpFormChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formImagePreview">
                        <Form.Label>Image Preview</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </Form.Group>
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdateQuestionPack}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateQuestionPack;
