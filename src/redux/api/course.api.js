import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utility/url'

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getCourse: build.query({
            query: () => 'course/getallCourse',
            providesTags: ['course']
        }),
        addCourse: build.mutation({
            query: (data) => ({
                url: 'course/addCourse',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const temid = crypto.randomUUID
                const patchResult = dispatch(
                    courseApi.util.updateQueryData('getCourse', undefined, (draft) => {
                        draft.data.push({ ...data, _id: temid })
                    }),
                )
                try {
                    const { data } = await queryFulfilled
                    console.log("rdata", data)
                    dispatch(
                        courseApi.util.updateQueryData('getCourse', undefined, (draft) => {
                            const findex = draft.data.findIndex((v) => v._id === temid)
                            draft.data[findex] = data.data
                        }),
                    )

                } catch {
                    patchResult.undo()
                }
            },
            //invalidatesTags: ['course']
        }),
        updateCourse: build.mutation({
            query: (data) => ({
                url: `course/updateCourse/${data.get("_id")}`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                console.log("uudata", data)
                const patchResult = dispatch(
                    courseApi.util.updateQueryData('getCourse', undefined, (draft) => {
                        console.log("uudata", draft.data)
                        const index = draft.data.findIndex((v) => v._id === data.get("_id"))
                        console.log("uudata", index)
                        if (index !== -1) {
                            draft.data[index] = ({
                                _id: data.get("_id"),
                                category: data.get("category"),
                                name: data.get("name"),
                                description: data.get("description"),
                                price: data.get("price"),
                                week_no: data.get("week_no"),
                                course_img: typeof data.get("course_img") === 'string' ? data.get("course_img") : URL.createObjectURL(data.get("course_img"))
                            });
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            //invalidatesTags: ['course']
        }),
        updateStatus: build.mutation({
            query: (data) => ({
                url: `course/updateStatus/${data._id}`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                console.log("uudata", data)
                const patchResult = dispatch(
                    courseApi.util.updateQueryData('getCourse', undefined, (draft) => {
                        console.log("uudata", draft.data)
                        const index = draft.data.findIndex((v) => v._id === data._id)
                        console.log("uudata", index)
                        if (index !== -1) {
                            draft.data[index].isactive = !data.isactive;
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
           //invalidatesTags: ['course']
        }),
        deleteCourse: build.mutation({
            query: (_id) => ({
                url: `course/deleteCourse/${_id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(_id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    courseApi.util.updateQueryData('getCourse', undefined, (draft) => {
                        const index = draft.data.findIndex((v) => v._id === _id)
                        console.log("index", index)

                        if (index !== -1) {
                            draft.data.splice(index, 1)
                        }

                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            //invalidatesTags: ['course']
        }),
    })
})

export const { useGetCourseQuery, useAddCourseMutation, useUpdateCourseMutation, useUpdateStatusMutation, useDeleteCourseMutation } = courseApi;