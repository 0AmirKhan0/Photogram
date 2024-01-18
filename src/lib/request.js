import axios from "axios";

const BaseUrl = "http://localhost:3001"
export const getReq = async (uri) => {
    const url = BaseUrl + uri
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const postReq = async (uri, data) => {
    const url = BaseUrl + uri
    try {
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        console.log(error)
    }
};

