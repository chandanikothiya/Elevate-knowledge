import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utility/url'

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getCourse: build.query({
            query: () => '/course/getallCourse',
            providesTags: ['course']
        }),
        addCourse: build.mutation({
            query: (data) => ({
                url: '/course/addCourse',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['course']
        }),
        updateCourse: build.mutation({
            query: (data) => ({
                url: `/course/addCourse/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['course']
        }),
        deleteCourse:build.mutation({
            
        })
    })
})

export const { useGetCourseQuery, useAddCourseMutation } = courseApi;