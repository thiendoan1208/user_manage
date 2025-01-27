import axios /*instance*/ from './customize-axios';
// Tự do đổi tên import nếu là export default

function fetchAllUsers(pages) {
  return axios.get(`/api/users?page=${pages}`); /* res.data */
}

const postCreateUser = (name, job) => {
  return axios.post('/api/users', { name: name, job: job });
};

export { fetchAllUsers, postCreateUser };

// cần export nhiều thì sử dụng {}

/*
Khi gọi fetchAllUsers:

Nó sử dụng instance với baseURL = 'https://reqres.in'.
Tự động ghép endpoint "/api/users?page=1" vào baseURL.
Interceptor sẽ xử lý response và chỉ trả về phần data.
 */
