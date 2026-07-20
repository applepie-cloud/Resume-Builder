import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Login from './Login';

const Layout = () => {
  const { user,loading } = useSelector((state) => state.auth);
  
  if(loading) {
    return <Loader />
  }
  
  return (
    <div>
      {user ?
        (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            <NavBar />
            <Outlet />
        </div>
        ) : (
          <Login />
        )
    }

    </div>
  )
}

export default Layout;