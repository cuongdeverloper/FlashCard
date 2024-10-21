import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { apiAssignQpToClass, getClassById } from '../../service/ApiService';
import { toast } from 'react-toastify';

const ModalAssignQpToClass = (props) => {
  const [show, setShow] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classOptions, setClassOptions] = useState([]); 
  const [loading, setLoading] = useState(false);    
  const [error, setError] = useState(null);    

  const { selectedOption } = props;
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const getApiClassForUser = async () => {
    try {
      setLoading(true);
      const response = await getClassById();
      console.log(response)
      const options = response.data.map((cls) => ({
        value: cls._id,
        label: `${cls.name} - ${cls._id}`
      }));
      setClassOptions(options); 
      setLoading(false); 
    } catch (err) {
      setError('Failed to load class data');
      setLoading(false); 
    }
  };

  useEffect(() => {
    getApiClassForUser(); 
  }, []); 

  const handleAssign = async() => {
    if (selectedClass) {

      let response = await apiAssignQpToClass(selectedClass.value,selectedOption?.value)
      if(response && response.errorCode === 0) {
        toast.success(response.message)
      } else {
        if(response && response.errorCode === 10){
            toast.warning(response.message)
        }
      }
      console.log(response)
    } else {
      console.log('No class selected');
    }
  };

  return (
    <>
      <Button variant="primary" className='mt-4 mx-3' onClick={handleShow}>
      Assign <b style={{color:'#333'}}>{selectedOption.label}</b> to Class
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Question Pack to Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading class data...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <p>Assigning the following question pack:</p>
              <p><strong>Title:</strong> {selectedOption?.label}</p>
              <p><strong>Id:</strong> {selectedOption?.value}</p>
              <Select
                options={classOptions} 
                value={selectedClass} 
                onChange={setSelectedClass} 
                placeholder="Select Class"
                
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAssign} disabled={!selectedClass}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAssignQpToClass;
