import axios from "./customize-axios";
// Tự do đổi tên import nếu là export default

function fetchAllUsers() {
    return axios.get("/api/users?page=1");
}

export {fetchAllUsers};

// cần export nhiều thì sử dụng {}