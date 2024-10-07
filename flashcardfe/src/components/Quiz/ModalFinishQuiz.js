import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResultQuizz = (props) => {
  const {show, setShow, dataResult} = props;
useEffect(()=>{
    console.log(dataResult)
},[])
  const handleClose = () => setShow(false);

    // console.log(dataResult)

  return (
    <>  
      <Modal show={show} 
      onHide={handleClose}
      backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>RESULT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                Total question : <b>{dataResult.countTotal}</b> <br/>   
                Total correct answers: <b>{dataResult.countCorrect}</b>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClose() }}>
            Show answers
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalResultQuizz

