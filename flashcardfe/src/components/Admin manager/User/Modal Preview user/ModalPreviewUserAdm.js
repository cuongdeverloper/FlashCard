import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const ModalPreviewUserAdm = (props) => {
  const { show, setShow, user } = props;

  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{user._id}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{user.type}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{user.balance}</td>
              </tr>
              <tr>
                <td>Profile Image</td>
                <td>
                  <img src={user?.image} alt="User Profile" style={{ width: '100px', height: '100px' }} />
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p>No user data available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPreviewUserAdm;
