import axios from "axios";
const BASE_URL = "http://localhost:4000/auth";

export default axios.create({
    headers: {
        'content-type': 'application/json'
    },
    baseURL: BASE_URL,
});