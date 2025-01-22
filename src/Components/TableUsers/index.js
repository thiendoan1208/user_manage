import { useEffect, useState } from 'react';
// import styles from './TableUsers.module.scss';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '~/Services/user-service';

function TableUsers(props) {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let res = await fetchAllUsers();

    if (res && res.data && res.data.data) {
      setListUsers(res.data.data);
    }
  };

  return (
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
        {listUsers && listUsers.length > 0 &&
        listUsers.map((item, index) =>(
            <tr key={`user-${index}`}>
            <td>{item.id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
          </tr>
        ))
        }
      </tbody>
    </Table>
  );
}

export default TableUsers;
