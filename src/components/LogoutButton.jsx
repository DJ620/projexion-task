import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem('userInfo');
    };

  return (
    <button style={{height: "30px"}} onClick={handleLogout}>Logout</button>
  )
};

export default LogoutButton;