import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getquiz: builder.query({
            query: () => ({
                url: '/quiz/getallQuize',
            }),
            providesTags: ['quiz']
        }),
        addquiz: builder.mutation({
            query: (data) => ({
                url: '/quiz/addQuize',
                method: 'post',
                body: data
            }),
            invalidatesTags:['quiz']
        }),
        editquiz: builder.mutation({
            query: (data) => ({
                url: `/quiz/updateQuize/${data._id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags:['quiz']
        }),
        deletequiz: builder.mutation({
            query: (id) => ({
                url: `/quiz/deleteQuize/${id}`,
                method: 'delete'
            }),
            invalidatesTags:['quiz']
        }),
    })
})

export const { useGetquizQuery,useAddquizMutation,useEditquizMutation,useDeletequizMutation } = quizApi;