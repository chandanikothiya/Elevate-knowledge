import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isloading: false,
    category: [],
    error: null
}

export const addcategory = createAsyncThunk(
    'category/addcategory',
    async (data) => {
        console.log("addda", data.categoryimg.name);

        try {
            const c = { ...data, categoryimg: data.categoryimg.name }

            const response = await fetch("http://localhost:3000/category", {
                method: "POST",
                body: JSON.stringify(c),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const datar = await response.json();
            console.log("addda", datar)
            return datar
        } catch (error) {
            console.log(error)
        }
    }
)

export const getcategory = createAsyncThunk(
    'category/getcategory',
    async () => {
        try {
            const response = await fetch("http://localhost:3000/category")
            const data = await response.json();
            console.log("addda", data);

            return data;
        } catch (error) {
            console.log(error)
        }

    }
)

export const deletecategory = createAsyncThunk(
    'category/deletecategory',
    async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/category/${id}`, {
                method: "DELETE"
            })

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
            let newdata = { ...data }

            if (typeof data.categoryimg === 'object') {
                newdata = { ...data, categoryimg: data.categoryimg.name }
            }

            const response = await fetch(`http://localhost:3000/category/${data.id}`, {
                method: "PUT",
                body: JSON.stringify(newdata),
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
        //builder.addcase is same like switch case,itdefine logic for handling actions
        builder.addCase(addcategory.fulfilled, (state, action) => {
            state.category.push(action.payload)
        })
        builder.addCase(getcategory.fulfilled, (state, action) => {
            state.category = action.payload
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