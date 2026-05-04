import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getallcart: builder.query({
            query: () => ({
                url: '/cart/getallcart',
            }),
            providesTags: ['cart']
        }),
        getcart: builder.query({
            query: (id) => ({
                url: `/cart/getcart/${id}`,
            }),
            providesTags: ['cart']
        }),
        addcart: builder.mutation({
            query: (data) => ({
                url: '/cart/addcart',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['cart']
        }),
        deletecart: builder.mutation({
            query: ({data,id}) => ({
                url: `/cart/deletecart${id}`,
                method: 'delete',
                body:data,
            }),
            invalidatesTags: ['cart']
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
    useGetallcartQuery, useGetcartQuery,
    useAddcartMutation, useDeletecartMutation } = cartApi;