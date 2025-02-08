import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import { loginAPI } from '~/Services/user-service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPasword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Missing email or password');
      return;
    }

    let res = await loginAPI('eve.holt@reqres.in', password);
    if (res && res.token) {
      localStorage.setItem('token', res.token);
    }
  };

  return (
    <div className="login-form mx-2 sm:mx-3 md:m-0 h-screen flex items-center justify-center">
      <div className="flex flex-col w-96">
        <div className="mb-4 text-xl font-bold text-center">Login</div>
        <div className="font-semibold">Email or Username</div>
        <form>
          <input
            type="text"
            className="w-full p-2 border-gray-300 border rounded my-1 bg-gray-100 outline-none hover:bg-gray-200 transition "
            placeholder="Email or Username"
            value={email}
            onChange={handleEmailInput}
            autoComplete="current-password"
          />
          <div className="position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full p-2 border-gray-300 border rounded my-1 bg-gray-100 outline-none hover:bg-gray-200 transition "
              placeholder="Password"
              value={password}
              onChange={handlePasswordInput}
              autoComplete="current-password"
            />
            {showPassword ? (
              <FontAwesomeIcon
                className="position-absolute bottom-1/3 right-3 cursor-pointer"
                icon={faEye}
                onClick={handleShowPasword}
              />
            ) : (
              <FontAwesomeIcon
                className="position-absolute bottom-1/3 right-3 cursor-pointer"
                icon={faEyeSlash}
                onClick={handleShowPasword}
              />
            )}
          </div>
        </form>
        <button
          disabled={email && password ? false : true}
          className={`text-center py-2 my-2 ${
            email && password ? 'bg-customLoginColorBtn' : 'bg-gray-100'
          } rounded-sm ${email && password ? 'text-white' : 'text-gray-300'}  font-semibold`}
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="flex justify-center items-center mt-2">
          <FontAwesomeIcon className="mx-2 cursor-pointer" icon={faChevronLeft} />
          <p className="mb-1 cursor-pointer">Go back</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
