import React from 'react';
import { FaSearch } from 'react-icons/fa';
import logoImage from '../../assets/logo.svg';
import NavBar from './NavBar'; // Adjust path as needed

const Header = () => {
  const token = localStorage.getItem('token');
  const handleloginclick=()=>{
    if (!token) {
      alert('Please login to access this feature.');
          window.location.href = '/login'; // Redirect to login page
    }
    else{
      localStorage.removeItem('token'); // Clear token on logout
      window.location.href = '/'; // Redirect to home page
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black to-gray-900 border-b border-gray-700 shadow-lg">
      {/* Top Section */}
      <div className="py-2 px-4 sm:px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logoImage}
            alt="Global Time Logo"
            className="h-12 w-12 sm:h-20 sm:w-20"
          />
        </div>

        {/* Center Text */}
        <div className="flex-1 flex justify-center">
          {/* Show full text on medium and up, only "Global Time" on small */}
          <h1 className="text-white text-xl sm:text-2xl font-bold text-center">
            <span className="block sm:hidden">GlobalTime</span>
            <span className="hidden sm:block">TronGlobalTime.com</span>
          </h1>
        </div>

        {/* Search + Login */}
        <div className="flex items-center space-x-4">
          {/* Hide search input on small screens */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="bg-white text-black px-4 py-2 pr-10 rounded-full w-44 sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>

          {/* Login Button */}
          <button className="bg-[#146c7b] hover:bg-teal-800 text-white px-4 py-2 sm:px-6 rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500"
          onClick={handleloginclick} // Redirect to login page
          >
            {token ? 'logout' : 'Login'}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <NavBar />
    </header>
  );
};

export default Header;
