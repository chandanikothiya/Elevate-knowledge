import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const sectionApi = createApi({
    reducerPath: 'sectionApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getsection: builder.query({
            query: () => ({
                url: '/section/getallSection',
            }),
            providesTags: ['section']
        }),
        addsection: builder.mutation({
            query: (data) => ({
                url: '/section/addSection',
                method: 'post',
                body: data
            }),
            invalidatesTags:['section']
        }),
        editsection: builder.mutation({
            query: (data) => ({
                url: `/section/updateSection/${data._id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags:['section']
        }),
        deletesection: builder.mutation({
            query: (id) => ({
                url: `/section/deleteSection/${id}`,
                method: 'delete'
            }),
            invalidatesTags:['section']
        }),
    })
})

export const { useGetsectionQuery, useAddsectionMutation,useEditsectionMutation,useDeletesectionMutation } = sectionApi;