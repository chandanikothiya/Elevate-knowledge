import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const questionApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getquestion: builder.query({
            query: () => ({
                url: '/question/getallQuestion',
            }),
            providesTags: ['question']
        }),
        addquestion: builder.mutation({
            query: (data) => ({
                url: '/question/addQuestion',
                method: 'post',
                body: data
            }),
            invalidatesTags:['question']
        }),
        editquestion: builder.mutation({
            query: (data) => ({
                url: `/question/updateQuestion/${data._id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags:['question']
        }),
        deletequestion: builder.mutation({
            query: (data) => ({
                url: `/question/deleteQuestion/${data._id}`,
                method: 'delete',
                body:data
            }),
            invalidatesTags:['question']
        }),
    })
})

export const { useGetquestionQuery,useAddquestionMutation,useEditquestionMutation,useDeletequestionMutation } = questionApi;