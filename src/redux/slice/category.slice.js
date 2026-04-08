import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utility/url";
import { axiosInstance } from "../../utility/axiosInstance"

const initialState = {
    isloading: false,
    category: [],
    error: null
}

export const addcategory = createAsyncThunk(
    'category/addcategory',
    async (data) => {
        console.log("adddaeeee", data);

        try {
            // const c = { ...data, categoryimg: data.categoryimg.name }

            const formdata = new FormData();
            formdata.append("name", data.name);
            formdata.append("description", data.description);
            formdata.append("category_img", data.category_img);

            if (data.parentcategory) {
                formdata.append("parent_category_id", data.parentcategory);
            }
            //formdata.append("parent_category_id", data.parentcategory);


            // const response = await fetch(BASE_URL + "category/addCategory", {
            //     method: "POST",
            //     body: formdata,
            // })

            const response = await axiosInstance.post('category/addCategory', formdata)
            console.log(response.data.data)
            return response.data.data;


        } catch (error) {
            console.log(error)
        }
    }
)

export const getcategory = createAsyncThunk(
    'category/getcategory',
    async () => {
        try {
            const response = await fetch(BASE_URL + "category/getallCategory")
            const data = await response?.json();
            //console.log("addda", data);

            return data?.data;
        } catch (error) {
            console.log(error)
        }

    }
)

export const getparentcategory = createAsyncThunk(
    'category/getparentcategory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(BASE_URL + "category/getparentCategories")
            const data = await response.json();
            console.log("addda", data);

            return data.data;
        } catch (error) {
            console.log("caterror", error.message)
            return rejectWithValue(error.message)
        }

    }
)

export const deletecategory = createAsyncThunk(
    'category/deletecategory',
    async (id) => {
        try {

            console.log("delteid", id)

            // const response = await fetch(`${BASE_URL}category/deleteCategory/${id}`, {
            //     method: "DELETE"
            // })

            const response = await axiosInstance.delete(`category/deleteCategory/${id}`)

           console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const editcategory = createAsyncThunk(
    'category/editcategory',
    async (data) => {
        try {
            console.log("data", data);
            const formdata = new FormData();
            formdata.append("name", data.name);
            formdata.append("description", data.description);
            formdata.append("category_img", data.category_img)

            if (data.parentcategory) {
                formdata.append("parent_category_id", data.parentcategory)
            }


            // const response = await fetch(`${BASE_URL}category/updateCategory/${data._id}`, {
            //     method: "PUT",
            //     body: formdata,

            // });

            const response = await axiosInstance.put(`category/updateCategory/${data._id}`, formdata)
            console.log("response", response)
            return response.data.data;

        } catch (error) {
            console.log(error)
        }

    }
)

const categoryslice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        //builder.addcase is same like switch case,it define logic for handling actions
        builder.addCase(addcategory.fulfilled, (state, action) => {
            state.category.push(action.payload)
            // console.log(state.category)
        })
        builder.addCase(getcategory.pending, (state, action) => {
            state.isloading = true
            // console.log(action.payload)
        })
        builder.addCase(getcategory.fulfilled, (state, action) => {
            state.isloading = false
            state.category = action.payload
            // console.log(action.payload)
        })
        builder.addCase(getparentcategory.pending, (state, action) => {
            state.isloading = true
            // console.log(action.payload)
        })
        builder.addCase(getparentcategory.fulfilled, (state, action) => {
            state.isloading = false
            state.category = action.payload
            // console.log(action.payload)
        })
        builder.addCase(getparentcategory.rejected, (state, action) => {
            state.isloading = false
            state.category = []
            // console.log(action.payload)
        })
        builder.addCase(deletecategory.fulfilled, (state, action) => {
            console.log("payload", action.payload, state.category)
            state.category = state.category.filter((v) => v._id !== action.payload)
        })
        builder.addCase(editcategory.fulfilled, (state, action) => {
            const index = state.category.findIndex((v) => v._id === action.payload._id)
            state.category[index] = action.payload
        })
    }
})

export default categoryslice.reducer