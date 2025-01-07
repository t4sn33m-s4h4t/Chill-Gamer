import Navbar from '../components/Header/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import DarkModeToggle from "react-dark-mode-toggle";
import { useState, useEffect } from 'react';

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Navbar>
        <div className="justify-center lg:ml-5 flex ">
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={50}
          />
        </div>
      </Navbar>
      <div className='dark:bg-blue-950 pb-20'>
        <Outlet />
      </div>
      <ToastContainer position="top-center" />
      <Footer />
    </div>
  );
};

export default Root;
