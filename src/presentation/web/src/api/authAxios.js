import axios from "axios";
const BASE_URL = "http://localhost:4000/auth";

export default axios.create({
    headers: {
        'Authorization': `Barer ${localStorage.getItem('token') ? localStorage.getItem('token') : null}`
    },
    baseURL: BASE_URL,
});
