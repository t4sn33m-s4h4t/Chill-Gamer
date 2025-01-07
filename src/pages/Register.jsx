import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { toast } from 'react-toastify';
import { BiSolidHide } from 'react-icons/bi';
import { IoEye } from 'react-icons/io5';
import Title from '../components/title/Title';


const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const { createUser, setUser, signInWithGoogle, signInWithGitHub } = useContext(AuthContext)
  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!password) {
      setError('Password is required.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    try {
      const newUser = await createUser(email, password, name, photoURL);
      setUser(newUser)
      toast.success("User Registered Successfully!")
    } catch (error) {
      toast.error(error.message || 'Failed to Register. Please try again.');
    }
    setFormData({ email: '', name: '', photoURL: '', password: '' })
  }

  function HandleFieldChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleGoggleSingIn = async () => {
    setError('');
    try {
      const newUser = await signInWithGoogle();
      setUser(newUser)
      toast.success("User Logged In Successfully!")
    } catch (error) {
      console.error(error.message)
      toast.error('Failed to sign in with Google.');
    }
    setFormData({ email: '', name: '', photoURL: '', password: '' })
  }
  const handleGitHubSignIn = async () => {
    setError('');
    try {
      const newUser = await signInWithGitHub();
      setUser(newUser);
      toast.success("User Logged In Successfully!");
    } catch (error) {
      console.error('Error during GitHub sign-in:', error);
      toast.error('Failed to sign in with GitHub.');
    }
  };
  const [hidePass, setHidePass] = useState(true)
  return (
    <div className="max-w-[80%] mx-auto">

      <Title text={"Register"} />
      <div className="lg:px-60 md:px-20 px-2 md:py-20 py-2 bg-green-950 dark:bg-sky-900 rounded-xl">
        <form
          className="card-body bg-white dark:bg-indigo-950 lg:px-[15%] md:px-12 px-4 py-10 rounded-lg"
          onSubmit={handleSubmit}
        >
          <Link
            to="/login"
            className="text-teal-800 text-center hover:text-black underline dark:text-white"
          >
            Already have an account? Log in now!
          </Link>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={HandleFieldChange}
              className="dark:bg-white dark:text-black input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={formData.email}
              placeholder="Email"
              name="email"
              onChange={HandleFieldChange}
              className="dark:bg-white dark:text-black input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              value={formData.photoURL}
              placeholder="Photo URL"
              name="photoURL"
              onChange={HandleFieldChange}
              className="dark:bg-white dark:text-black input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className='flex dark:bg-white dark:text-black justify-between items-center input input-bordered'>
              <input
                type={`${hidePass ? 'password' : 'text'}`}
                value={formData.password}
                placeholder="Password"
                name="password"
                onChange={HandleFieldChange}
                required
                className='w-full'
              />
              <div className='cursor-pointer' onClick={() => setHidePass(!hidePass)}>
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
              className="btn bg-green-950 text-white hover:bg-teal-950  dark:bg-indigo-50 dark:text-black"
            >
              Register
            </button>
          </div>

          <GoogleLoginButton onClick={handleGoggleSingIn} />
          <GithubLoginButton onClick={handleGitHubSignIn} />
        </form>
      </div>
    </div>
  );
};

export default Register;
