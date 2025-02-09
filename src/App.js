import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext';

import Header from './Components/Header';
import Home from './Components/Home';
import TableUsers from './Components/TableUsers';
import Login from './Components/Login';

function App() {
  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(localStorage.getItem('token'), localStorage.getItem('email'));
    }
  }, []);

  return (
    <>
      <div className="app__container">
        <Header />
        <Container className="mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
