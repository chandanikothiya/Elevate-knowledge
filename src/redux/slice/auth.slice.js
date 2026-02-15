import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    user:{},
    auth:false
}

export const registeruser = createAsyncThunk(
    'auth/registeruser',
    async(data) => {
        console.log(data)
        try {
            
            const response = await axios.post('http://localhost:8080/api/v1/user/addRegister',data)
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }
)


const authSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder) => {

    }
})

export default authSlice.reducer