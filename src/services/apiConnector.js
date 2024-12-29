 import axios from "axios";

 export const axiosInstance = axios.create({});


// export const apiConnector = (method, url, bodyData, headers, params) => {
//     return axiosInstance({
//         method: method,
//         url: url,
//         data: bodyData?bodyData:null,
//         headers: headers?headers:null,
//         params: params?params:null
//     })
// };
export const apiConnector = async (method, url, bodyData, headers, params) => {
    try {
        const response = await axiosInstance({
            method: method,
            url: url,
            data: bodyData || null,
            headers: headers || null,
            params: params || null,
        });
        return response;
    } catch (error) {
        console.error("Error in apiConnector:", error);
        throw error;
    }
};
