import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utility/url'

export const demoApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
       
        adddemo: build.mutation({
            query: (data) => ({
                url: 'demo/adddemo',
                method: 'POST',
                body: data
            }),
            // async onQueryStarted(data, { dispatch, queryFulfilled }) {
            //     const temid = crypto.randomUUID
            //     const patchResult = dispatch(
            //         courseApi.util.updateQueryData('getCourse', undefined, (draft) => {
            //             draft.data.push({ ...data, _id: temid })
            //         }),
            //     )
            //     try {
            //         const { data } = await queryFulfilled
            //         console.log("rdata", data)
            //         dispatch(
            //             courseApi.util.updateQueryData('getCourse', undefined, (draft) => {
            //                 const findex = draft.data.findIndex((v) => v._id === temid)
            //                 draft.data[findex] = data.data
            //             }),
            //         )

            //     } catch {
            //         patchResult.undo()
            //     }
            // },
            //invalidatesTags: ['course']
        })
    })
})

export const { useAdddemoMutation } = demoApi;