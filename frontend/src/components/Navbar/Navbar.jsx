import React from 'react';
import Logo from "../../assets/logoNoBackgroundCropped.png";


const Navbar = () => {
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
            <a href="#" className="text-red-600 font-semibold border-b-2 border-red-600">Home</a>
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

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white">
            <i className="fas fa-cog"></i> {/* Settings icon */}
          </button>
          <button className="text-gray-300 hover:text-white">
            <i className="fas fa-bell"></i> {/* Notification icon */}
          </button>
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

export default Navbar;
