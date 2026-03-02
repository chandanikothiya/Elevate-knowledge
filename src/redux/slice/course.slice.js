import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { setalert } from "./alert.slice";

const initialState = {
    isloading: false,
    course: [],
    errors: null
}

export const getcourse = createAsyncThunk(
    'course/getcourse',
    async () => {

        try {
            console.log("okok");

            const coursedata = await axios.get('http://localhost:8080/api/v1/course/getallCourse');
            console.log("cours", coursedata.data.data)
            return coursedata.data.data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const addcourse = createAsyncThunk(
    'course/addcourse',
    async (data, { dispatch, rejectWithValue }) => {
        console.log("data", data)

        const formdata = new FormData();
        formdata.append("category", data.category);
        formdata.append("instructor_id", data.instructor_id);
        formdata.append("name", data.name);
        formdata.append("description", data.description);
        formdata.append("price", data.price);
        formdata.append("week_no", data.week_no);
        formdata.append("course_img", data.course_img);


        try {
            const coursedata = await axios.post('http://localhost:8080/api/v1/course/addCourse', formdata);
            console.log(coursedata.data.data)

            if (coursedata.data.success) {
                dispatch(setalert({ text: coursedata.data.message, variant: 'success' }))
            return coursedata.data.data;
            }

            

        } catch (error) {
            console.log(error)
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
)

export const editcoures = createAsyncThunk(
    'course/editcoures',
    async (data) => {

        try {

            const formdata = new FormData();
            formdata.append("category", data.category);
            formdata.append("name", data.name);
            formdata.append("description", data.description);
            formdata.append("price", data.price);
            formdata.append("week_no", data.week_no);
            formdata.append("course_img", data.course_img);
            console.log(formdata)

            const coursedata = await axios.put(`http://localhost:8080/api/v1/course/updateCourse/${id}`, formdata)
            return coursedata.data.data._id;
        } catch (error) {
            console.log(error)
        }
    }
)


export const deletecoures = createAsyncThunk(
    'course/deletecoures',
    async (id) => {
        console.log(id)
        try {
            const coursedata = await axios.delete(`http://localhost:8080/api/v1/course/deleteCourse/${id}`)

            console.log(coursedata.data.data._id)
            return coursedata.data.data._id;
        } catch (error) {
            console.log(error)
        }
    }
)

const courseslice = createSlice({
    name: 'course',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getcourse.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isloading = false,
                state.course = action.payload,
                state.errors = null
        }),
            builder.addCase(addcourse.fulfilled, (state, action) => {
                state.isloading = false,
                    state.course.push(action.payload),
                    state.errors = null
            }),
            builder.addCase(editcoures.fulfilled, (state, action) => {
                const index = state.course.findIndex((v) => v._id === action.payload._id);
                state.isloading = false,
                    state.course[index] = action.payload;
                state.errors = null
            }),
            builder.addCase(deletecoures.fulfilled, (state, action) => {
                state.isloading = false,
                    state.course = state.course.filter((v) => v._id !== action.payload),
                    state.errors = null
            })
    }
})

export default courseslice.reducer;