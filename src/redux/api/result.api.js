import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const resultApi = createApi({
    reducerPath: 'resultApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getallresult: builder.query({
            query: () => ({
                url: '/result/getallresult',
            }),
            providesTags: ['result']
        }),
        getresult: builder.query({
            query: (id) => ({
                url: `/result/getresult/${id}`,
            }),
            providesTags: ['result']
        }),
        addresult: builder.mutation({
            query: (data) => ({
                url: '/result/addresult',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['result']
        }),
        // editquiz: builder.mutation({
        //     query: (data) => ({
        //         url: `/quiz/updateQuize/${data._id}`,
        //         method: 'put',
        //         body: data
        //     }),
        //     invalidatesTags:['quiz']
        // }),
        // deletequiz: builder.mutation({
        //     query: (id) => ({
        //         url: `/quiz/deleteQuize/${id}`,
        //         method: 'delete'
        //     }),
        //     invalidatesTags:['quiz']
        // }),
    })
})

export const {
    useGetallresultQuery,
    useGetresultQuery,
    useAddresultMutation } = resultApi;