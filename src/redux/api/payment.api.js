import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utility/url";


export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        createpayment: builder.query({
            query: () => ({
                url: '/payment/createpayment',
            }),
            providesTags: ['payment']
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
   useCreatepaymentQuery  } = paymentApi;