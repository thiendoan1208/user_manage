import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '~/Context/UserContext';

import './Login.scss';
import { loginAPI } from '~/Services/user-service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoadingAPI, setShowLoadingAPI] = useState(false);

  const { loginContext, user } = useContext(UserContext);

  const LoginBtn = useRef();

  const navigate = useNavigate();

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

    setShowLoadingAPI(true);
    let res = await loginAPI(email.trim(), password);
    if (res && res.token) {
      toast.success('Login success');
      loginContext(res, email);
      navigate('/');
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setShowLoadingAPI(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if (!email || !password) {
        toast.error('Missing email or password');
        return;
      }

      setShowLoadingAPI(true);
      let res = await loginAPI(email.trim(), password);
      if (res && res.token) {
        toast.success('Login success');
        loginContext(res, email);
        navigate('/');
      } else {
        if (res && res.status === 400) {
          toast.error(res.data.error);
        }
      }
      setShowLoadingAPI(false);
    }
  };

  // Disable Btn when loading API
  useEffect(() => {
    const loginButtonRef = LoginBtn.current;

    if (showLoadingAPI) {
      loginButtonRef.classList.add('pointer-events-none');
      loginButtonRef.classList.add('bg-gray-200');
    } else {
      loginButtonRef.classList.remove('pointer-events-none');
      loginButtonRef.classList.remove('bg-gray-200');
    }
  }, [setShowLoadingAPI, showLoadingAPI]);

  // không cho người dùng vào trang login khi đã đăng nhập
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  });

  return (
    <div className="login-form mx-2 sm:mx-3 md:m-0  flex items-center justify-center">
      <div className="flex flex-col w-96">
        <div className="mb-4 text-xl font-bold text-center">Login</div>
        <div className="font-semibold">Email or Username (eve.holt@reqres.in)</div>
        <form>
          <input
            type="text"
            className="w-full h- p-2 border-gray-300 border rounded my-1 bg-gray-100 outline-none hover:bg-gray-200 transition "
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
              onKeyDown={handleKeyDown}
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
          ref={LoginBtn}
          disabled={email && password ? false : true}
          className={`login_btn flex justify-center items-center text-center py-2 my-2 rounded-sm font-semibold 
            ${email && password ? 'bg-customLoginColorBtn' : 'bg-gray-100'}  
            ${email && password ? 'text-white' : 'text-gray-300'} `}
          onClick={handleLogin}
        >
          <span>Login</span>
          {showLoadingAPI && (
            <svg className="ml-1 mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
              <FontAwesomeIcon icon={faSpinner} />
            </svg>
          )}
        </button>
        <Link to="/" className="flex justify-center items-center mt-2 text-black text-decoration-none">
          <FontAwesomeIcon className="mx-2 cursor-pointer" icon={faChevronLeft} />
          <p className="mb-1 cursor-pointer">Go back</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
