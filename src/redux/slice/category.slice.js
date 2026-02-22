import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utility/url";

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


            const response = await fetch(BASE_URL + "category/addCategory", {
                method: "POST",
                body: formdata,
            })

            const datar = await response.json();
            console.log("addda", datar)
            return datar.data
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
            const data = await response.json();
            console.log("addda", data);

            return data.data;
        } catch (error) {
            console.log(error)
        }

    }
)

export const getparentcategory = createAsyncThunk(
    'category/getparentcategory',
    async () => {
        try {
            const response = await fetch(BASE_URL + "category/getparentCategories")
            const data = await response.json();
            console.log("addda", data);

            return data.data;
        } catch (error) {
            console.log(error)
        }

    }
)

export const deletecategory = createAsyncThunk(
    'category/deletecategory',
    async (id) => {
        try {

            console.log("delteid", id)

            const response = await fetch(`${BASE_URL}category/deleteCategory/${id}`, {
                method: "DELETE"
            })

            const data = await response.json();
            console.log(data)

            return id;
        } catch (error) {
            console.log(error)
        }
    }
)

export const editcategory = createAsyncThunk(
    'category/editcategory',
    async (data) => {
        try {
            console.log(data);

            const formdata = new FormData();
            formdata.append("name", data.name);
            formdata.append("description", data.description);
            formdata.append("category_img", data.category_img)

            const response = await fetch(`${BASE_URL}category/updateCategory/${data._id}`, {
                method: "PUT",
                body: formdata,

            });
            const datar = await response.json()

            return datar.data;
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
        builder.addCase(getcategory.fulfilled, (state, action) => {
            state.category = action.payload
            // console.log(action.payload)
        })
        builder.addCase(getparentcategory.fulfilled, (state, action) => {
            state.category = action.payload
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