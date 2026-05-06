import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const couponApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getallcoupon: builder.query({
            query: () => ({
                url: '/coupon/getallcoupon',
            }),
            providesTags: ['coupon']
        }),
        getcoupon: builder.query({
            query: (id) => ({
                url: `/coupon/getcoupon/${id}`,
            }),
            providesTags: ['coupon']
        }),
        addcoupon: builder.mutation({
            query: (data) => ({
                url: '/coupon/addcoupon',
                method: 'post',
                body: data
            }),
            invalidatesTags: ['coupon']
        }),
        updatecoupon: builder.mutation({
            query: (data) => ({
                url: `/coupon/updatecoupon/${data._id}`,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['coupon']
        }),
        deletecoupon: builder.mutation({
            query: (id) => ({
                url: `/coupon/deletecoupon/${id}`,
                method: 'delete',
               
            }),
            invalidatesTags: ['coupon']
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
    useGetallcouponQuery, useGetcouponQuery, useAddcouponMutation,
    useUpdatecouponMutation, useDeletecouponMutation } = couponApi;