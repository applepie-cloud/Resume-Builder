import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../app/features/authSlice';

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    Navigate("/");
    dispatch(logout());
  }
  return (
    <div className='shadow bg-white'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
        <Link to="/">
          <img src="logo.svg" alt="logo" className='h-10 w-auto' />
        </Link>

      <div className='flex items-center gap-4 text-sm'>
        <p className='max-sm:hidden'>
          Hi, {user?.name}
        </p>
        <button onClick={logoutUser} className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors'>Logout</button>
      </div>
      </nav>

    </div>
  )
}

export default NavBar