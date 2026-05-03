import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getallwishlist: builder.query({
            query: () => ({
                url: '/cart/getallcart',
            }),
            providesTags: ['wishlist']
        }),
        getwishlist: builder.query({
            query: (id) => ({
                url: `/cart/getcart/${id}`,
            }),
            providesTags: ['wishlist']
        }),
        addwishlist: builder.mutation({
            query: (data) => ({
                url: '/cart/addcart',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['wishlist']
        }),
         deletewishlist: builder.mutation({
            query: (id) => ({
                url: `/cart/deletecart/${id}`,
                method: 'delete'
            }),
            invalidatesTags:['wishlist']
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
   useAddwishlistMutation,useGetallwishlistQuery,
   useGetwishlistQuery,useDeletewishlistMutation} = wishlistApi;