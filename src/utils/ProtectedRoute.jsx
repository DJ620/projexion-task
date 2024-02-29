import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoredInfo from './StoredInfo';

function ProtectedRoute({Component}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!StoredInfo.isTokenValid()) {
            navigate("/");
            // localStorage.removeItem('userInfo');
        }
    }, []);
    
  return (
    <Component />
  )
};

export default ProtectedRoute;