import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { joinClassByInvite } from '../service/ApiService';
import { toast } from 'react-toastify';

const JoinClass = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleJoinClass = async () => {
      try {
        const response = await joinClassByInvite(token);
        console.log(response)
        if (response && response.message === 'Successfully joined the class') {
            toast.success('join success')
          navigate(`/classes/${response.data._id}`);
        } else {
          console.error('Failed to join class:', response.message);
        }
      } catch (error) {
        console.error('Error joining class:', error);
      }
    };
    handleJoinClass();
  }, [token, navigate]);

  return <div>Joining class...</div>;
};

export default JoinClass;
