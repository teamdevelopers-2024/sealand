import React from "react";
import Logo from "../../assets/logoNoBackground.png";
import User from "../../assets/user.svg";
import Lock from "../../assets/lock.svg";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      {/* Container for the logo and login form */}
      {/* Left section with the logo */}
      <div className="w-1/2 flex items-center justify-center">
        <img src={Logo} alt="Sea Land Car Care" className="w-3/4" />
      </div>

      {/* Divider line */}
      <div className="w-px h-4/5 bg-gray-500"></div>

      {/* Right section with the login form */}
      <div className="w-1/2 p-8 flex flex-col items-center justify-center">
        <h2 className="text-white text-3xl font-bold mb-4">WELCOME</h2>
        <p className="text-gray-400 mb-8">PLEASE LOGIN TO ADMIN DASHBOARD</p>

        {/* Username Input */}
        <div className="mb-6 w-full max-w-md">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="username"
          >
            {/* <div className="flex items-center">
              <img src={User} alt="user svg" />
              Username
            </div> */}
          </label>
          <input
            className="w-full p-3 text-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6 w-full max-w-md">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            {/* <div className="flex items-center">
              <img src={Lock} alt="lock svg" />
              Password
            </div> */}
          </label>
          <input
            className="w-full p-3 text-gray-900 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>

        {/* Login Button */}
        <button className="bg-red-500 w-full max-w-md text-white font-bold py-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
