import axios from "axios";

function fetchAllUsers() {
    return axios.get("https://reqres.in/api/users?page=1");
}

export {fetchAllUsers};

// cần export nhiều thì sử dụng {}