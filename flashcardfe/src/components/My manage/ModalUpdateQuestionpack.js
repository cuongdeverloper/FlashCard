import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./css/modalUpdate.scss";

const ModalUpdateQuestionPack = ({ show, handleClose, handleUpdateQuestionPack, qpForm, handleQpFormChange, imagePreview, setImagePreview }) => {
    return (
        <Modal show={show} onHide={handleClose} className="modal-custom">
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title>Update Question Pack</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
                <Form className="form-custom">
                    <Form.Group controlId="formTitle" className="form-group-custom">
                        <Form.Label className="form-label-custom">Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={qpForm.title}
                            onChange={handleQpFormChange}
                            className="form-control-custom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className="form-group-custom">
                        <Form.Label className="form-label-custom">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={qpForm.description}
                            onChange={handleQpFormChange}
                            className="form-control-custom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formIsPublic" className="form-group-custom">
                        <Form.Check
                            type="checkbox"
                            label="Is Public"
                            name="isPublic"
                            checked={qpForm.isPublic}
                            onChange={handleQpFormChange}
                            className="form-check-custom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formSemester" className="form-group-custom">
                        <Form.Label className="form-label-custom">Semester</Form.Label>
                        <Form.Control
                            type="text"
                            name="semester"
                            value={qpForm.semester}
                            onChange={handleQpFormChange}
                            className="form-control-custom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formSubject" className="form-group-custom">
                        <Form.Label className="form-label-custom">Subject</Form.Label>
                        <Form.Control
                            type="text"
                            name="subject"
                            value={qpForm.subject}
                            onChange={handleQpFormChange}
                            className="form-control-custom"
                        />
                    </Form.Group>
                    <Form.Group controlId="formImagePreview" className="form-group-custom">
                        <Form.Label className="form-label-custom">Image Preview</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                            className="file-input-custom"
                        />
                    </Form.Group>
                    {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview-custom" />}
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-footer-custom">
                <Button variant="secondary" onClick={handleClose} className="button-custom">
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdateQuestionPack} className="button-custom">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateQuestionPack;
