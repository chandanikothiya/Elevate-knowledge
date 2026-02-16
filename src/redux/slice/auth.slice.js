import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    user: {},
    auth: false
}

export const registeruser = createAsyncThunk(
    'auth/registeruser',
    async (data) => {
        console.log(data)
        try {

            const response = await axios.post('http://localhost:8080/api/v1/user/addRegister', data)
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
            const response = await axios.post('http://localhost:8080/api/v1/user/verifyuser', data);
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
            const response = await axios.post('http://localhost:8080/api/v1/user/loginuser', data,{withCredentials:true})
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registeruser.fulfilled, (state, action) => {
            state.user = action.payload
            state.auth = true
            console.log(state.user)
        })
        builder.addCase(verifyuser.fulfilled, (state, action) => {
            state.user = action.payload
            console.log(state.user)
        })
    }
})

export default authSlice.reducer