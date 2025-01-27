import { useState } from 'react';
import { Container } from 'react-bootstrap';

import AddNewUser from './Components/AddNewUser';
import Header from './Components/Header';
import TableUsers from './Components/TableUsers';

function App() {
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);

  const handleClose = () => {
    setIsShowModalAddUser(false);
  };

  return (
    <div className="app__container">
      {/* Header */}
      <Header />
      {/* Container */}
      <Container>
        <div className="my-4 flex items-center justify-between">
          <span>
            <h6>List Users:</h6>
          </span>
          <button
            className="btn btn-success"
            onClick={() => {
              setIsShowModalAddUser(true);
            }}
          >
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>
      <AddNewUser show={isShowModalAddUser} handleClose={handleClose} />
    </div>
  );
}

export default App;
