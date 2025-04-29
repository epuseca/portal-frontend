import axios from "./axios.customize";

const createUserApi = (name, email, password, role) => {
    const URL_API = "/v1/api/register"
    const data = { name, email, password, role }
    console.log('data', data)
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


const getTagApiHome = () => {
    const URL_API = "/v1/api/?populate=listSystem"
    return axios.get(URL_API)
}
const updateUserApi = (data) => {
    const URL_API = `/v1/api/user/${data.id}`;
    return axios.put(URL_API, data); // data không cần chứa `id`, nhưng không sao nếu có
};
const getTagApi = () => {
    const URL_API = "/v1/api/tag?populate=listSystem"
    return axios.get(URL_API)
}
const createTagApi = (name, description) => {
    const URL_API = "/v1/api/tag";
    const data = { name, description }
    return axios.post(URL_API, data)
}
const updateTagApi = (data) => {
    const URL_API = `/v1/api/tag/${data.id}`;
    return axios.put(URL_API, data);
};
const delTagApi = (id) => {
    return axios.delete(`/v1/api/tag/${id}`);
};

const getSystemApi = () => {
    const URL_API = "/v1/api/system"
    return axios.get(URL_API)
}
const createSystemApi = (name, description, linkAccess, managingUnit, contactPoint) => {
    const URL_API = "/v1/api/system";
    const data = { name, description, linkAccess,  managingUnit, contactPoint }
    return axios.post(URL_API, data)
}
const updateSystemApi = (data) => {
    const URL_API = `/v1/api/system/${data.id}`;
    return axios.put(URL_API, data);
};
const delSystemApi = (id) => {
    return axios.delete(`/v1/api/system/${id}`);
};
const getSystemByIdApi = (id) => {
    const URL_API = `/v1/api/system/${id}`;
    return axios.get(URL_API);
};

const getImageSystemApi = async (id) => {
    const URL_API = `/v1/api/system/${id}/image`;
    try {
        const response = await axios({
            method: 'get',
            url: URL_API,
            responseType: 'blob',
        });
        if (response.size < 30) return;

        return URL.createObjectURL(response);
    } catch (error) {
        console.error("Lỗi lấy ảnh cho system", id, error.message);
        return null;
    }
};
const createSystemApiWithImage = async (systemData, imageFile) => {
    try {
        const createRes = await axios.post('/v1/api/system', systemData);
        console.log('createRes', createRes)
        if (!createRes?._id) {
            throw new Error("Failed to create system");
        }
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            await axios.post(`/v1/api/system/${createRes._id}/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        return createRes; // return created system if success
    } catch (error) {
        console.error("createSystemApiWithImage error:", error);
        return null;
    }
}
const editSystemApiWithImage = async (systemData, imageFile) => {
    try {
        console.log('systemData', systemData)
        const updateRes = await axios.put(`/v1/api/system/${systemData.id}`, systemData);
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);

            await axios.post(`/v1/api/system/${systemData.id}/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        return updateRes;
    } catch (error) {
        console.error("editSystemApiWithImage error:", error);
        return null;
    }
}
const uploadSystemDocumentApi = async (systemId, documentFile) => {
    const formData = new FormData();
    formData.append('document', documentFile);

    try {
        const res = await axios.post(`/v1/api/system/${systemId}/upload-document`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error("uploadSystemDocumentApi error:", error);
        return null;
    }
};

const downloadSystemDocumentApi = async (systemId) => {
    try {
        const response = await axios({
            method: 'get',
            url: `/v1/api/system/${systemId}/document`,
            responseType: 'blob',
        });
        console.log('response', response)
        return response;
    } catch (error) {
        console.error("downloadSystemDocumentApi error:", error);
        return null;
    }
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
    createTagApi,
    updateTagApi,
    delTagApi,
    createSystemApi,
    updateSystemApi,
    delSystemApi,
    getSystemByIdApi,
    getImageSystemApi,
    createSystemApiWithImage,
    editSystemApiWithImage,
    uploadSystemDocumentApi,
    downloadSystemDocumentApi,
}