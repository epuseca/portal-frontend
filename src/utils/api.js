import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register"
    const data = { name, email, password }
    return axios.post(URL_API, data)
}
const loginApi = (email, password) => {
    const URL_API = "/v1/api/login"
    const data = { email, password }
    return axios.post(URL_API, data)
}
const getUserApi = () => {
    const URL_API = "/v1/api/user"
    return axios.get(URL_API)
}
const delUserApi = (id) => {
    return axios.delete(`/v1/api/user/${id}`);
};
const getTagApi = () => {
    const URL_API = "/v1/api/tag"
    return axios.get(URL_API)
}
const getSystemApi = () => {
    const URL_API = "/v1/api/system"
    return axios.get(URL_API)
}
const getTagApiHome = () => {
    const URL_API = "/v1/api/?populate=listSystem"
    return axios.get(URL_API)
}
const updateUserApi = (data) => {
    const URL_API = `/v1/api/user/${data.id}`;
    return axios.put(URL_API, data); // data không cần chứa `id`, nhưng không sao nếu có
};


export {
    createUserApi,
    loginApi,
    getUserApi,
    getTagApi,
    getSystemApi,
    getTagApiHome,
    delUserApi,
    updateUserApi,
}