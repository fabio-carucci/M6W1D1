import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextProvider';

export default function ProtectedAuthRoute() {

    const { isLogged } = useAuth();

  return isLogged ? <Outlet /> : <Navigate to='/' />;
}
