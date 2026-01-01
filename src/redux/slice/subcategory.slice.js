import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isloading: false,
    subcategory: [],
    error: null
}

export const addsubcategory = createAsyncThunk(
    'subcategory/addsubcategory', //this action addsubcategory belong to subcategory slice meaning of this line 
    async (values) => {
        try {
            // const response = await fetch("http://localhost:3000/subcategory", {
            //     method: "POST",
            //     body: JSON.stringify(values),
            //     headers: { //header is like a label on parcel,they tell what kind of data is inside requset
            //         'Content-Type': 'application/json' //i am sending data in JSON format
            //     }
            // })
            //const data = await response.json()

            const response = await axios.post('http://localhost:3000/subcategory',values)
            console.log("response",response)
            
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

)

export const getsubcategory = createAsyncThunk(
    'subcategory/getsubcategory',
    async () => {
        try {

            const response = await axios.get("http://localhost:3000/subcategory")
           
            return response.data;

        } catch (error) {
            console.log(error)
        }
    }
)

export const deletesubcategory = createAsyncThunk(
    'subcategory/deletesubcategory',
    async (id) => {
        try {

            const response = await axios.delete(`http://localhost:3000/subcategory/${id}`)
            return id;

        } catch (error) {
            console.log(error)
        }
    }
)

export const editsubcategory = createAsyncThunk(
    'subcategory/editsubcategory',
    async (values) => {
        try {
            
            const response = await axios.put(`http://localhost:3000/subcategory/${values.id}`,values)
            console.log("edit",response)
            return response.data;
            
        } catch (error) {
            console.log(error)
        }
    }
)

const subcategoryslice = createSlice({
    name: 'subcategory',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addsubcategory.fulfilled, (state, action) => {
            state.subcategory.push(action.payload)
        })
        builder.addCase(getsubcategory.fulfilled, (state, action) => {
            state.subcategory = action.payload
        })
        builder.addCase(deletesubcategory.fulfilled, (state, action) => {
            state.subcategory = state.subcategory.filter(v => v.id !== action.payload)
        })
        builder.addCase(editsubcategory.fulfilled,(state,action) => {
            const index = state.subcategory.findIndex((v) => v.id === action.payload.id);
            state.subcategory[index] = action.payload;
        })
    }
})

export default subcategoryslice.reducer