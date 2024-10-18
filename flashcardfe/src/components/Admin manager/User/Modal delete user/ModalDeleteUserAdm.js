import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUserApi } from '../../../../service/ApiService';
import { toast } from 'react-toastify';

const ModalDeleteUserAdm = (props) => {
  const { show, setShow, user,onSuccess } = props;

  const handleClose = () => setShow(false);
const handleConfirmDelete = async(userId) =>{
    let response = await deleteUserApi(userId);
    console.log(response);
    if(response && response.errorCode===0){
        toast.success(response.message)       
        onSuccess();
        handleClose()
    } else{
        toast.error('error')
    }
    // window.location.reload();
}
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user ? (
            <>
              <p>Are you sure you want to delete the following user?</p>
              <p>
                <strong>User ID:</strong> {user._id}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </>
          ) : (
            <p>No user selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleConfirmDelete(user._id)}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUserAdm;
