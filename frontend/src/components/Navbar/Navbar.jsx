import React from 'react';
import Logo from "../../assets/logoNoBackgroundCropped.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Navbar = ({setAddIncomeModal}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {logout} = useAuth()

  const handleLogout = (e)=>{
    e.preventDefault()
    logout()
    navigate('/')
  }

  // Extracting the last segment of the pathname
  const pathSegment = location.pathname.split("/").filter(Boolean).pop();

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center ml-20">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 w-28"
            />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          <li>
            <a
              onClick={() => navigate('/home')}
              className={`cursor-pointer ${pathSegment=='home' ? 'text-red-600 font-semibold border-b-2 border-red-600' : 'hover:text-white'}`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/expense')}
              className={`${pathSegment === 'expense' ? 'text-red-600 font-semibold border-b-2 border-red-600' : 'hover:text-white'} cursor-pointer`}
              >
              Expenses
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/income')}
              className={`${pathSegment === 'income' ? 'text-red-600 font-semibold border-b-2 border-red-600' : 'hover:text-white'} cursor-pointer`}
              >
              Income
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/credit')}
              className={`${pathSegment === 'credit' ? 'text-red-600 font-semibold border-b-2 border-red-600' : 'hover:text-white'} cursor-pointer`}
              >
              Credit Customers
            </a>
          </li>
        </ul>

        {/* Icons and Add Income Button Placeholder */}
        <div className="flex items-center space-x-4">
          {/* Add Income Button or Invisible Placeholder */}   
          {/* Add Expense Button or Invisible Placeholder */}
          <div className="flex items-center">
          {pathSegment === 'income' && (
              <button onClick={()=> setAddIncomeModal(true)} className="bg-red-600 text-white px-4 py-2 rounded">
                Add Income
              </button>
            )}
            {pathSegment === 'expense' && (
              <button onClick={()=> setAddIncomeModal(true)} className="bg-red-600 text-white px-4 py-2 rounded">
                Add Expense
              </button>
            )}
            {pathSegment !== 'expense' && pathSegment !== 'income' && (
                   <button onClick={()=> setAddIncomeModal(true)} className="invisible bg-red-600 text-white px-4 py-2 rounded">
                   Add Expense
                 </button>
            )}
          </div>

          {/* Icons */}
          <button onClick={handleLogout}>logout</button>
          <img
            src="https://via.placeholder.com/150" // Replace with profile image URL
            alt="Profile"
            className="h-8 w-8 rounded-full"
            />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <ul className="md:hidden mt-4 space-y-2 text-gray-300">
        <li>
          <a href="#" className="text-red-600 font-semibold">Home</a>
        </li>
        <li>
          <a href="#" className="hover:text-white">Expenses</a>
        </li>
        <li>
          <a href="#" className="hover:text-white">Income</a>
        </li>
        <li>
          <a href="#" className="hover:text-white">Credit Customers</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
