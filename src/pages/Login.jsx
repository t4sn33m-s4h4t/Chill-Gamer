import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { toast } from 'react-toastify';
import { IoEye } from 'react-icons/io5';
import { BiSolidHide } from 'react-icons/bi';

import Title from "../components/title/Title"
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, setUser, signInWithGoogle, signInWithGitHub } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [hidePass, setHidePass] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;
    if (!password) {
      setError('Password is required.');
      return;
    }
    setError('');
    try {
      const newUser = await signIn(email, password);
      setUser(newUser);
      navigate(location?.state?.from || '/');
      toast.success("User Logged In Successfully!");
    } catch (error) {
      toast.error(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setFormData({ email: '', password: '' });
    }
  }

  function handleFieldChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const newUser = await signInWithGoogle();
      setUser(newUser);
      navigate(location?.state?.from || '/');
      toast.success("User Logged In Successfully!");
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      toast.error('Failed to sign in with Google.');
    }
  };

  const handleGitHubSignIn = async () => {
    setError('');
    try {
      const newUser = await signInWithGitHub();
      setUser(newUser);
      navigate(location?.state?.from || '/');
      toast.success("User Logged In Successfully!");
    } catch (error) {
      console.error('Error during GitHub sign-in:', error);
      toast.error('Another Account Exists with the Same Email');
    }
  };

  return (
    <div className="md:max-w-[80%] max-w-[90%] mx-auto">
      <Title text={"Login"} />
      <div className="lg:px-60 md:px-20 px-2 md:py-20 py-2 bg-green-950 dark:bg-sky-900 rounded-xl">
        <form
          className="card-body bg-white dark:bg-indigo-950 lg:px-[15%] md:px-12 px-4 py-10 rounded-lg"
          onSubmit={handleSubmit}
        >
          <Link
            to="/register"
            className="text-teal-800 text-center dark:text-white hover:text-black underline"
          >
            Don't Have an Account? Register Now!
          </Link>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              value={formData.email}
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleFieldChange}
              className="input input-bordered dark:bg-white dark:text-black"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex justify-between items-center dark:bg-white dark:text-black input input-bordered">
              <input
                type={hidePass ? 'password' : 'text'}
                value={formData.password}
                placeholder="Password"
                name="password"
                onChange={handleFieldChange}
                required
                className="w-full"
              />
              <div className="cursor-pointer" onClick={() => setHidePass(!hidePass)}>
                {hidePass ? <BiSolidHide /> : <IoEye />}
              </div>
            </div>
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-green-950 dark:bg-indigo-50 dark:text-black text-white hover:bg-teal-950"
            >
              Login
            </button>
          </div>
          <GoogleLoginButton onClick={handleGoogleSignIn} />
          <GithubLoginButton onClick={handleGitHubSignIn} />
        </form>
      </div>
    </div>
  );
};

export default Login;
