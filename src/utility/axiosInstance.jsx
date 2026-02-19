import axios from "axios";
import { BASE_URL } from "./url";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, //passing token from client and allow access to backend
    timeout: 10000
})


//before sending request run this code (in config url,data,headers,method)
axiosInstance.interceptors.request.use(function (config) {

    //console.log(config)
    return config;

}, function (error) {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    console.log(error)
    //call genrate new token when checkauth give 401 error
    if (error.response && error.response.status === 401) {
        const response = await axios.post(BASE_URL+'user/genratenewtoken',{},{withCredentials:true})
        console.log(response)

        return axiosInstance(error.config) //retry the original request that failed (here chcekaut request failed so it retry all to checkauth)When an Axios request fails, the error object provides a config property. This property holds the original configuration object used to make the initial, failed request (including the URL, method, headers, and data).
    }
    return Promise.reject(error);
})