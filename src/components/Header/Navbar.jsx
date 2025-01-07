import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider.jsx';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { RxAvatar } from 'react-icons/rx';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const Navbar = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOutUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(user?.photoURL);

  useEffect(() => {
    setImgSrc(user?.photoURL);
  }, [user?.photoURL]);

  const handleError = () => {
    setImgSrc(null);
  };

  async function logOut() {
    try {
      await signOutUser();
      setUser(null);
      toast.success("Logged Out Successfully!");
      navigate('/');
    } catch (error) {
      toast.error('Error logging out:', error.message);
    }
  }

  return (
    <div className="header shadow-lg bg-indigo-50 dark:bg-indigo-950 sticky top-0 z-50">
      <nav className="mx-auto px-4 md:px-10 lg:px-24">
        <div className="navbar">
          <div className="navbar-start">
            <Link to="/" className="btn dark:text-white btn-ghost normal-case text-lg md:text-xl">
              Chill Gamer
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink className="px-3" to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className="px-3" to="/reviews">All Reviews</NavLink>
              </li>
              <li>
                <NavLink className="px-3" to="/add-review">Add Review</NavLink>
              </li>
              <li>
                <NavLink className="px-3" to="/my-reviews">My Reviews</NavLink>
              </li>
              <li>
                <NavLink className="px-3" to="/game-watchList">Game WatchList</NavLink>
              </li>
              <li>
                <NavLink className='px-3' to="/about">About Us</NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <Tooltip id="avatar-tooltip" className='z-10' />
            {user?.email ? (
              <div className="items-center hidden lg:flex space-x-2 lg:gap-4">
                <button
                  data-tooltip-id="avatar-tooltip"
                  data-tooltip-content={user.displayName}
                  tabIndex="0"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 lg:w-11 rounded-full border-2 p-1 border-teal-800 dark:border-teal-500">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt="Profile"
                        onError={handleError}
                        className="bg-base-200 w-full h-full rounded-full shadow-md"
                      />
                    ) : (
                      <RxAvatar className="bg-base-200 w-full h-full rounded-full shadow-md" />
                    )}
                  </div>
                </button>

                <button
                  onClick={logOut}
                  className="btn bg-teal-950 dark:bg-teal-600 text-white text-xs lg:text-sm"
                >
                  Log Out
                </button>
                {children}
              </div>
            ) : (
              <div className="hidden lg:flex space-x-2 items-center">
                <Link to="/login" className="btn border-0 bg-green-950 dark:bg-green-700 text-white text-xs lg:text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn border-0 bg-teal-900 dark:bg-teal-600 text-white text-xs lg:text-sm">
                  Register
                </Link>
                {children}
              </div>
            )}
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-5">
            <ul className="menu bg-teal-50 dark:bg-teal-950 p-4 rounded-box space-y-2">
              <li>
                <NavLink className="px-3" to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className="px-3" to="/reviews">All Reviews</NavLink>
              </li>
              <li>
                <NavLink className="px-3" to="/add-review">Add Review</NavLink>
              </li>
              <li>
                <NavLink className="px-3" to="/my-reviews">My Reviews</NavLink>
              </li>
              <li>
                <NavLink className="px-3" to="/game-watchList">Game WatchList</NavLink>
              </li>
              <li>
                <NavLink className='px-3' to="/about">About Us</NavLink>
              </li>
              {user?.email && (
                <li>
                  <button onClick={logOut} className="btn bg-teal-950 dark:bg-teal-600 text-white text-sm w-full">Log Out</button>
                </li>
              )}
              {!user?.email && (
                <li className="space-y-2">
                  <Link to="/login" className="btn bg-green-950 text-white text-sm w-full dark:bg-green-700">Login</Link>
                  <Link to="/register" className="btn bg-teal-900 text-white text-sm w-full dark:bg-teal-600">Register</Link>
                </li>
              )}
              {children}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
