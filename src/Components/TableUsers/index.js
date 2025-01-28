import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '~/Services/user-service';
import Pagination from '@mui/material/Pagination';
import _ from 'lodash';

import AddNewUser from '../AddNewUser';
import ModalEditUser from '../ModalEditUser';
import ModalConfirm from '../ModalConfirm';

function TableUsers(props) {
  const [listUsers, setListUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);

  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  // Add new user
  const handleUpdateTableUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);

    // Tác dụng của cloneDeep trong Lodash.
    // Nếu không dùng cloneDeep thì khi sao chép biến cloneListUsers sang listUsers sẽ bị trỏ đến cùng 1 vùng nhớ
    //  từ đó gây ra sự thay đổi kể cả khi ta chưa bấm xác nhận để đổi tên và sẽ không ảnh hưởng đến mảng gốc.
    // Khi dùng cloneDeep thì sẽ khiến cho khi sao chép thì 2 biến sẽ chỉ đến 2 vùng nhớ khác nhau, từ đó không ảnh hưởng đến nhau.
  };

  // Get user API
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

  // List user pagination
  const hanglePageClick = (event, value) => {
    getUsers(value);
  };

  // Close modal
  const handleClose = () => {
    setIsShowModalAddUser(false);
    setIsShowModalEditUser(false);
    setIsShowModalDelete(false);
  };

  // Modal Edit user Open/Close
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEditUser(true);
  };

  // Modal Delete user
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
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
            <th>Action</th>
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
                <td className="flex">
                  <button
                    className=" mx-1 btn btn-warning"
                    onClick={() => {
                      handleEditUser(item);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="mx-1 btn btn-danger"
                    onClick={() => {
                      handleDeleteUser(item);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="flex justify-center items-center">
        <Pagination count={totalPages} onChange={hanglePageClick} />
      </div>

      <AddNewUser show={isShowModalAddUser} handleClose={handleClose} handleUpdateTableUser={handleUpdateTableUser} />

      <ModalEditUser
        show={isShowModalEditUser}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalConfirm show={isShowModalDelete} handleClose={handleClose} dataUserDelete={dataUserDelete} />
    </>
  );
}

export default TableUsers;
