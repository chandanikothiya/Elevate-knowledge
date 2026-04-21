import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getcontent: builder.query({
            query: () => ({
                url: '/content/getallContent',
            }),
            providesTags: ['quiz']
        }),
        addcontent: builder.mutation({
            query: (data) => ({
                url: '/content/addContent',
                method: 'post',
                body: data
            }),
            invalidatesTags:['quiz']
        }),
        editcontent: builder.mutation({
            query: (data) => ({
                url: `/content/updateContent/${data.get("_id")}`,
                method: 'put',
                body: data
            }),
            invalidatesTags:['quiz']
        }),
        deletecontent: builder.mutation({
            query: (id) => ({
                url: `/content/deleteContent/${id}`,
                method: 'delete'
            }),
            invalidatesTags:['quiz']
        }),
    })
})

export const { useGetcontentQuery,useAddcontentMutation,useEditcontentMutation,useDeletecontentMutation } = quizApi;