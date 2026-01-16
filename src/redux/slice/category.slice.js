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
            formdata.append("name",data.name);
            formdata.append("description",data.description);
            formdata.append("category_img",data.category_img)

            const response = await fetch(BASE_URL + "category/addCategory", {
                method: "POST",
                body:formdata,
               
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

export const deletecategory = createAsyncThunk(
    'category/deletecategory',
    async (id) => {
        try {
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

            const response = await fetch(`${BASE_URL}category/updateCategory/${data.id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const datar = await response.json()

            return datar;
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
        builder.addCase(deletecategory.fulfilled, (state, action) => {
            state.category = state.category.filter((v) => v.id !== action.payload)
        })
        builder.addCase(editcategory.fulfilled, (state, action) => {
            const index = state.category.findIndex((v) => v.id === action.payload.id)
            state.category[index] = action.payload
        })
    }
})

export default categoryslice.reducer