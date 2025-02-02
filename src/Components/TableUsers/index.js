import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from '@mui/material/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong, faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { debounce } from 'lodash';

import { fetchAllUsers } from '~/Services/user-service';
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

  const [sortBy, setSortBy] = useState('id');
  const [sortField, setSortField] = useState('asc');

  const [keyWord, setKeyWord] = useState('');

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

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };

  // Sort Item
  const handleSort = (sortByParam, sortFieldParam) => {
    setSortBy(sortByParam);
    setSortField(sortFieldParam);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortByParam], [sortFieldParam]);

    /* 
    Tác dụng của _.orderBy: truyền vào 3 giá trị, 
    
    var data = _.sortBy(arr_of_obj, ["type", "name"], ["asc", "desc"])

    1. sắp xếp theo mảng nào
    2. dùng phần tử nào trong obj bên trong mảng để sắp xếp
    3. Sắp xếp theo kiểu desc hay asc (lớn nhỏ, nhỏ lớn) 
    */
    setListUsers(cloneListUsers);
  };

  // Handle Search

  const handleSearchEventInput = (e) => {
    let value = e.target.value
    handleSearchEvent(value);
    setKeyWord(value);
  }

  const handleSearchEvent = debounce((value) => {
    let term = value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) => item.email.includes(term));
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }

  }, 500);

  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="my-1 flex items-center">
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

      <div>
        <input
          className="border border-red-400 p-1 my-2 width-full"
          placeholder="Find User..."
          value={keyWord}
          onChange={handleSearchEventInput}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="flex justify-between">
                <span>ID</span>
                <span>
                  <FontAwesomeIcon
                    className="px-1 cursor-pointer hover:opacity-70 transition-all  "
                    icon={faArrowDownLong}
                    onClick={() => {
                      handleSort('id', 'desc');
                    }}
                  />
                  <FontAwesomeIcon
                    className="px-1 cursor-pointer hover:opacity-70 transition-all  "
                    icon={faArrowUpLong}
                    onClick={() => {
                      handleSort('id', 'asc');
                    }}
                  />
                </span>
              </div>
            </th>
            <th>
              <div className="flex justify-between">
                <span>First Name</span>
                <span>
                  <FontAwesomeIcon
                    className="px-1 cursor-pointer hover:opacity-70 transition-all  "
                    icon={faArrowDownLong}
                    onClick={() => {
                      handleSort('first_name', 'desc');
                    }}
                  />
                  <FontAwesomeIcon
                    className="px-1 cursor-pointer hover:opacity-70 transition-all  "
                    icon={faArrowUpLong}
                    onClick={() => {
                      handleSort('first_name', 'asc');
                    }}
                  />
                </span>
              </div>
            </th>
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

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
}

export default TableUsers;
