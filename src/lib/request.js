import axios from "axios";

const BaseUrl = "http://localhost:3001"
export const get = async (uri) => {
    const url = BaseUrl + uri
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(error)
    }
};

export const post = async (uri, data) => {
    const url = BaseUrl + uri
    try {
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        console.log(error)
    }
};

