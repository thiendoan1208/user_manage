import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Header from './Components/Header';
import TableUsers from './Components/TableUsers';

function App() {

  return (
    <>
      <div className="app__container">
        {/* Header */}
        <Header />
        {/* Container */}
        <Container>
          <TableUsers />
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
