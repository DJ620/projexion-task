import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem('userInfo');
    };

  return (
    <button className='bg-green-400 px-4 py-2 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-300' onClick={handleLogout}>Logout</button>
  )
};

export default LogoutButton;