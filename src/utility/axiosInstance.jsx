import axios from "axios";
import { BASE_URL } from "./url";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000
})


//before sending request run this code (in config url,data,headers,method)
axiosInstance.interceptors.request.use(function (config) {
    // const token = localStorage.getItem("token");
    // console.log(token)

    //console.log("getItem length:", localStorage.getItem.length);
    //console.log(config)
    return config;

}, function (error) {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})