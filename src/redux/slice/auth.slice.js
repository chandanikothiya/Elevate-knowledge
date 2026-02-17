import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    user: {},
    auth: false
}

const axiosInstance = axios.create({
    baseURL:'http://localhost:8080/api/v1/user',
    headers:{
        'Content-Type':'application/json',
    },
})

//before sending request run this code (in config url,data,headers,method)
axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    console.log(token)
   
        //console.log("getItem length:", localStorage.getItem.length);
        console.log(config)

    return config;
}, function (error) {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})


export const registeruser = createAsyncThunk(
    'auth/registeruser',
    async (data) => {
        console.log(data)
        try {

            const response = await axiosInstance.post('/addRegister', data)
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const verifyuser = createAsyncThunk(
    'auth/verifyuser',
    async (data) => {
        try {
            const response = await axiosInstance.post('/verifyuser', data);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const loginuser = createAsyncThunk(
    'auth/loginuser',
    async (data) => {
        try {
            const response = await axiosInstance.post('/loginuser', data, { withCredentials: true })
            console.log(response)
            
            return response.data.data;
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registeruser.fulfilled, (state, action) => {
            state.user = action.payload
            console.log(state.user)
        })
        builder.addCase(verifyuser.fulfilled, (state, action) => {
            state.user = action.payload
            console.log(state.user)
        })
        builder.addCase(loginuser.fulfilled, (state, action) => {
            //console.log(action.payload.refreshtoken)
            localStorage.setItem("token",action.payload.refreshtoken)
            state.user = action.payload;
            state.auth = true
        });
    }
})

export default authSlice.reducer