import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../utility/axiosInstance"
import { setalert } from "./alert.slice"

const initialState = {
    isloading: false,
    user: null,
    errors: null
}


export const registeruser = createAsyncThunk(
    'auth/registeruser',
    async (data, { rejectWithValue }) => {
        console.log(data)
        try {

            const response = await axiosInstance.post('user/addRegister', data)
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            console.log(error)
            dispatch(setalert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const verifyuser = createAsyncThunk(
    'auth/verifyuser',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('user/verifyuser', data);
            console.log(response);
            if (response.data.success) {
                dispatch(setalert({ text: response.data.message, variant: 'success' }))
                return response.data.data;
            }

        } catch (error) {
            console.log(error)
            dispatch(setalert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const loginuser = createAsyncThunk(
    'auth/loginuser',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('user/loginuser', data)

            if (response.data.success) {
                dispatch(setalert({ text: response.data.message, variant: 'success' }))
                return response.data.data;
            }

            console.log(response)

        } catch (error) {
            console.log("error", error.response)
            dispatch(setalert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const logoutuser = createAsyncThunk(
    'auth/logoutuser',
    async (_id, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('user/logout', { _id })
            console.log(response)

            if (response.data.success) {
                dispatch(setalert({ text: response.data.message, variant: 'success' }))
                return response.data.data;
            }
        } catch (error) {
            console.log(error)
            dispatch(setalert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const checkauth = createAsyncThunk(
    'auth/checkauth',
    async (_,{rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('user/checkauth')
            console.log(response)

            if (response.data.success) {
                return response.data.data;
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registeruser.pending, (state, action) => {
            state.isloading = true;
            state.user = null
            state.errors = null;
        })
        builder.addCase(registeruser.fulfilled, (state, action) => {
            state.isloading = false;
            state.user = action.payload
            state.errors = null;
            console.log(state.user)
        })
        builder.addCase(registeruser.rejected, (state, action) => {
            state.isloading = false;
            state.user = null;
            state.errors = action.payload
        })

        builder.addCase(verifyuser.pending, (state, action) => {
            state.isloading = true;
            state.user = null
            state.errors = null;
        })
        builder.addCase(verifyuser.fulfilled, (state, action) => {
            state.user = action.payload
            console.log(state.user)
        })
        builder.addCase(verifyuser.rejected, (state, action) => {
            state.isloading = false;
            state.user = null;
            state.errors = action.payload
        })

         builder.addCase(loginuser.pending, (state, action) => {
            state.isloading = true;
            state.user = null
            state.errors = null;
        })
        builder.addCase(loginuser.fulfilled, (state, action) => {
            state.isloading = false;
            state.user = action.payload;
            state.errors = null
        })
        builder.addCase(loginuser.rejected, (state, action) => {
            console.log(action.payload)
            state.isloading = false;
            state.user = null;
            state.errors = action.payload
        })

        builder.addCase(logoutuser.pending, (state, action) => {
            state.isloading = true;
            state.user = null
            state.errors = null;
        })
        builder.addCase(logoutuser.fulfilled, (state, action) => {
            state.isloading = false;
            state.user = action.payload;
            state.errors = null
        });
        builder.addCase(logoutuser.rejected, (state, action) => {
            console.log(action.payload)
            state.isloading = false;
            state.user = null;
            state.errors = action.payload
        })


        builder.addCase(checkauth.fulfilled, (state, action) => {
            state.isloading = false;
            state.user = action.payload;
            state.errors = null
        });
        builder.addCase(checkauth.rejected, (state, action) => {
            state.isloading = false;
            state.user = null;
            state.errors = action.payload
        })
    }
})

export default authSlice.reducer