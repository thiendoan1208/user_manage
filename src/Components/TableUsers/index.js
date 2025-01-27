import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '~/Services/user-service';
import Pagination from '@mui/material/Pagination';
import AddNewUser from '../AddNewUser';

// import styles from './TableUsers.module.scss';

function TableUsers(props) {
  const [listUsers, setListUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);

  const handleUpdateTableUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalUser(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const hanglePageClick = (event, value) => {
    getUsers(value);
  };

  const handleClose = () => {
    setIsShowModalAddUser(false);
  };
  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="my-4 flex items-center">
          <span>
            <h6>List Users:</h6>
          </span>
        </div>
        <button
          className="btn btn-success -translate-y-1"
          onClick={() => {
            setIsShowModalAddUser(true);
          }}
        >
          Add new user
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => (
              <tr key={`user-${index}`}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="flex justify-center items-center">
        <Pagination count={totalPages} onChange={hanglePageClick} />
      </div>

      <AddNewUser 
      show={isShowModalAddUser} 
      handleClose={handleClose} 
      handleUpdateTableUser={handleUpdateTableUser} />
    </>
  );
}

export default TableUsers;
