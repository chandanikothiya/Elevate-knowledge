import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getcontent: builder.query({
            query: () => ({
                url: '/content/getallContent',
            }),
            providesTags: ['content']
        }),
        addcontent: builder.mutation({
            query: (data) => ({
                url: '/content/addContent',
                method: 'post',
                body: data
            }),
            invalidatesTags:['content']
        }),
        editcontent: builder.mutation({
            query: (data) => ({
                url: `/content/updateContent/${data.get("_id")}`,
                method: 'put',
                body: data
            }),
            invalidatesTags:['content']
        }),
        deletecontent: builder.mutation({
            query: (id) => ({
                url: `/content/deleteContent/${id}`,
                method: 'delete'
            }),
            invalidatesTags:['content']
        }),
    })
})

export const { useGetcontentQuery,useAddcontentMutation,useEditcontentMutation,useDeletecontentMutation } = contentApi;