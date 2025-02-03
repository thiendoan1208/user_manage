import { use, useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';
import Pagination from '@mui/material/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong, faArrowDownLong, faFileExport, faFileImport, faPlus } from '@fortawesome/free-solid-svg-icons';

import _ from 'lodash';
import { debounce } from 'lodash';

import { CSVLink, CSVDownload } from 'react-csv';

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

  const [dataExport, setDataExport] = useState([]);

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
    let value = e.target.value;
    handleSearchEvent(value);
    setKeyWord(value);
  };

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

  // CSV Export Infomation to Excel
  const getUserExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(['ID', 'Email', 'First Name', 'Last Name']);
      // eslint-disable-next-line array-callback-return
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  // 2 tham số event và done là do thư viện trả về chứ không nhận từ trong code
  /*
   - Giải thích một chút về cách vận hành.
   + đầu tiên hàm sẽ nhận vào 2 tham số được trả về từ thư viện là event và done
   + ở phần click sẽ sử dụng async click để có thể báo rằng phải chờ onClick sử lý xong data thì chỗ data={} mới nhận data và in vào file
   + đầu tiên mảng result là []
   + sau đó đẩy vào mảng giá trị đầu chính là header (theo format của CSV)
   data = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
    + tiếp theo lặp qua từng phần tử của mảng Listuser để lấy data của từng phần và push data vào trong result qua mỗi lần lặp 
    + sau khi lặp xong sẽ setDataExport(result) 
    + và cuối cungf là báo done() để hàm biết rằng đã xong và sẽ cho data={} lấy dữ liệu
  */
  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="my-1 flex items-center">
          <span>
            <h6>List Users:</h6>
          </span>
        </div>

        <div>
          <button className="btn btn-warning mr-2 text-white">
            <FontAwesomeIcon icon={faFileImport} />
            <span className="ml-1">
              <label htmlFor="import-data-user" className="cursor-pointer">
                Import
              </label>
              <input type="file" id="import-data-user" className="hidden" />
            </span>
          </button>

          <CSVLink
            data={dataExport}
            filename={'user.csv'}
            asyncOnClick={true}
            onClick={getUserExport}
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faFileExport} />
            <span className="ml-1">Export</span>
          </CSVLink>
          <button
            className="btn btn-success ml-2"
            onClick={() => {
              setIsShowModalAddUser(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-1">Add new</span>
          </button>
        </div>
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
