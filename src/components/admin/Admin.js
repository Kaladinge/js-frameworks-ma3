import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Pages from '../home/Pages';
import Heading from '../layout/Heading';

function Admin() {

  const [token] = useContext(AuthContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
    navigate("/");
    }
  })

  return (
    <>
      <Heading title="Admin Pages"/>
      <Pages />
    </>
  )
}

export default Admin