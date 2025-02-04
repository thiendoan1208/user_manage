import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { Route, Routes} from 'react-router-dom';

import Header from './Components/Header';
import Home from './Components/Home';
import TableUsers from './Components/TableUsers';

function App() {
  return (
    <>
      <div className="app__container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
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
