import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MyTextField from '../../components/MyTextField/MyTextField';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory } from '../../../redux/slice/category.slice';
import { Formik, Form } from 'formik';
import UploadFile from '../../components/UploadFile/UploadFile';
import { mixed, number, object, string } from 'yup';
import { addcourse, deletecoures, editcoures, getcourse } from '../../../redux/slice/course.slice';
import { DataGrid } from '@mui/x-data-grid';
import { IMG_URL } from '../../../utility/url';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import { useAddCourseMutation, useDeleteCourseMutation, useGetCourseQuery, useUpdateCourseMutation, useUpdateStatusMutation } from '../../../redux/api/course.api';
import { useGetsectionQuery } from '../../../redux/api/section.api';
import { useAddcontentMutation, useDeletecontentMutation, useEditcontentMutation, useGetcontentQuery } from '../../../redux/api/content.api';

function Content(props) {

    const [open, setOpen] = React.useState(false);
    const [updatecontent, setUpdateContent] = useState({})
    const [inputcount, setInputcount] = useState(1)
    const [files, setfiles] = useState([])
    const [price, setPrice] = useState('')
    console.log("fileskk", files)

    console.log("inputcount", inputcount)

    // const coures = useSelector(state => state.course)
    // console.log("addda", coures.course);

    const { data, error, isLoading } = useGetsectionQuery();
    console.log("datadata", data)


    const { data: contentdata, error: contenterror, isLoading: contentisloading } = useGetcontentQuery();
    const [addcontent] = useAddcontentMutation();
    const [editcontent] = useEditcontentMutation();
    const [deletecontent] = useDeletecontentMutation();
    const [updatestatus] = useUpdateStatusMutation();

    const getdata = async () => {
        dispatch(getcategory())
        //dispatch(getcourse())
    }

    useEffect(() => {
        getdata()
        //setInputcount(1)

    }, [])



    let ddata = [
        { value: '', label: 'Select Parent Category' }
    ];

    data?.data?.map((v) => {
        ddata.push({ value: v._id, label: v.name })
    })

    let order_no = [
        { value: '', label: 'Select Order No' }
    ]

    for (let i = 0; i <= 20; i++) {
        order_no.push({ value: i, label: i })
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const courseSchema = object({
        section_id: string().required(),
        name: string().required(),
        description: string().required(),
        duration: string().required(),
        order_no: number().required(),
        //week_no: string().required(),
        // course_img: mixed().required()
    })

    function handledelete(id) {
        console.log(id)
        //dispatch(deletecoures(id))
        deletecontent(id)
    }

    function handleedit(data) {
        console.log("edata", data)
        handleClickOpen();
        setUpdateContent(data)
        console.log("updatecourse", updatecontent)
        setInputcount(data?.content_file?.length || 1)
    }

    function handletoggle(data) {
        //console.log(!data.isactive,data)
        updatestatus(data)
    }

    function handlesubmit(values) {
        const insid = JSON.parse(localStorage.getItem("loginuser"))
        console.log("insvalue", values,values._id)

        const formdata = new FormData();
        formdata.append("section_id", values.section_id);
        formdata.append("name", values.name);
        formdata.append("description", values.description);
        formdata.append("duration", values.duration);
        formdata.append("order_no", values.order_no);
        //formdata.append("course_video", values.course_video);

        for (let key in values) {
            if (key.startsWith("content_file") && values[key]) {
                formdata.append("content_file", values[key]);
            }
        }

        if (values.course_img instanceof File) {
            formdata.append("content_file", values.course_img);
        } else {
            //formdata.append("course_img", values.course_img);
        }

        // if (values.course_video instanceof File) {
        //     formdata.append("course_video", values.course_video);
        // } else {
        // }



        if (Object.keys(updatecontent).length > 0) {

            let oldimages = [];
            console.log("updatecourse", oldimages, values)

            const sendkey = Object.fromEntries(
                Object.entries(values).filter(([key]) => key.startsWith('content_file'))
            )

            console.log('sendkey',sendkey)

            //console.log("updatecourse", Object.values(sendkey))
            let notupdateid = []
            Object.values(sendkey).map((v) => {
                //console.log("updatecourse",v)
                // if (! v instanceof File) {
                //     const keys = Object.keys(sendkey).map(key => ({
                //         key: key,
                //         value: sendkey[key]
                //     }));
                //     formdata.append("upateimg",keys);
                //     console.log("updatecourse",keys)
                // }

                if (!(v instanceof File)) {
                    console.log("updatecourse", v)
                    notupdateid.push(v.public_id);
                }
            })
            console.log("updatecourse", notupdateid)
            formdata.append("notupdateid", JSON.stringify(notupdateid));


            formdata.append("_id", values._id);
            console.log("formdata id", formdata.get("_id"));
            if (typeof values.course_img === 'object') {
                editcontent(formdata)
            } else {
                editcontent(formdata)
            }

            //dispatch(editcoures(values))
            console.log("uval", values);
        } else {
            //dispatch(addcourse(values))
            addcontent(formdata)
        }
    }

    const columns = [
        {
            field: "section_id", headerName: 'section', width: 120,
            renderCell: (params) => {
                // console.log(categorys.category.find(v => v._id === params.row.category))
                return data?.data?.find(v => v._id === params.row.section_id) ? data?.data?.find(v => v._id === params.row.section_id).name : ''
            }
        },
        { field: "name", headerName: 'name', width: 180 },
        { field: "description", headerName: 'description', width: 180 },
        {
            field: "content_file", headerName: 'content files', width: 200,
            renderCell: (params) => (
                <>
                    {console.log("params.row", params)}
                    {/* <img src={params.row.course_img?.url?.includes('blob') ? params.row.course_img :
                        params.row.course_img?.url} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} /> */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {
                            params.row?.content_file?.map((v) => {
                                if (v?.url?.includes('.pdf')) {
                                    console.log("pdf", v.url)
                                    return (
                                        <>
                                            <a href={v?.url} onClick={() => window.open(v?.url, '_blank')}>
                                                pdf

                                                <iframe src={v?.url} width="40px" height="50px" onClick={() => window.open(v?.url, '_blank')}></iframe>
                                            </a>
                                        </>
                                    )

                                } else if (v?.url?.includes('.mp4')) {
                                    return (<video width={"40px"} height={"40px"} style={{ objectFit: 'cover' }} onClick={() => window.open(v?.url, '_blank')}>
                                        <source
                                            src={v?.url}
                                            type="video/mp4" />
                                    </video>)
                                }
                            })
                            // params.row?.course_img?.map((v) => (
                            //     <img src={v?.url} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} />
                            // ))
                        }
                    </div>
                    {/* <img src={params.row?.course_img[0]?.url} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} /> */}

                </>
            )
        },
        // {
        //     field: "course_video", headerName: 'course_video', width: 120,
        //     renderCell: (params) => (
        //         <>
        //             {console.log("params.row", params)}
        //             {/* <img src={params.row.course_img?.url?.includes('blob') ? params.row.course_img :
        //                 params.row.course_img?.url} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} /> */}
        //             <video width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} onClick={() => window.open(params.row?.course_video?.url, '_blank')}>
        //                 <source
        //                     src={params.row?.course_video?.url}
        //                     type="video/mp4" />
        //             </video>

        //         </>
        //     )
        // },
        { field: "duration", headerName: 'duration', width: 100 },
        { field: "order_no", headerName: 'order_no', width: 100 },
        {
            field: 'isactive', headerName: 'isactive', width: 100,
            renderCell: (params) => (
                <>
                    {console.log(params, params.id)}
                    <IconButton aria-label="delete"
                        color="primary"
                        onClick={(e) => handletoggle(params.row)}
                    >
                        <Switch checked={params.row.isactive} />
                    </IconButton>
                </>
            )
        },
        {
            field: 'Action', headerName: 'Action', width: 100,
            renderCell: (params) => (
                <>
                    {console.log(params, params.id)}
                    <IconButton aria-label="delete"
                        color="primary"
                        onClick={(e) => handleedit(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete"
                        color="error"
                        onClick={(e) => handledelete(params.row._id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }

    ]
    const paginationModel = { page: 0, pageSize: 5 };
    console.log("price", price)


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Course</DialogTitle>
                <DialogContent>

                    <Formik
                        initialValues={Object.keys(updatecontent).length > 0 ? {
                            ...updatecontent,
                            ...updatecontent.content_file?.reduce((acc, img, index) => {
                                acc[`content_file_${index}`] = img;
                                return acc;
                            }, {})
                        } : {
                            section_id: '',
                            name: '',
                            description: '',
                            duration: '',
                            order_no: '',
                        }}
                        validationSchema={courseSchema}
                        enableReinitialize={true}
                        onSubmit={(values, { resetForm }) => {
                            console.log("fval", values)
                            handlesubmit(values)

                            handleClose();
                            resetForm();
                        }}
                    >
                        {({ values }) => {
                            console.log("valuesvalues", values)
                            return (<Form id="subscription-form">

                                <MyTextField
                                    name="section_id"
                                    id="section"
                                    label="Select Section"
                                    InputLabelProps={{ shrink: true, required: true }}
                                    select
                                    data={ddata}
                                    slotProps={{
                                        select: {
                                            native: true,
                                        },
                                    }}
                                />

                                <MyTextField
                                    name="name"
                                    id="name"
                                    label="Enter Content Name"
                                />

                                <MyTextField
                                    name="description"
                                    id="description"
                                    label="Enter Description"
                                />

                                <MyTextField
                                    name="duration"
                                    id="duration"
                                    label="Enter Duration"
                                />

                                <MyTextField
                                    name="order_no"
                                    id="orderno"
                                    label="Order No"
                                    select
                                    InputLabelProps={{ shrink: true, required: true }}
                                    data={order_no}
                                    slotProps={{
                                        select: {
                                            native: true,
                                        },
                                    }}
                                    sx={{ mt: 3 }}
                                />

                                {/* <MyTextField
                                    name="week_no"
                                    id="week_no"
                                    label="Enter Week No"
                                /> */}

                                {/* <UploadFile
                                    name='course_img'
                                    label="upload image"
                                /> */}

                                {/* <UploadFile
                                    name='content_file'
                                    label="uplaod video"
                                /> */}

                                {Array.from(Array(inputcount)).map((c, index) => {
                                    console.log("one", c, index)
                                    return (
                                        <>
                                            <div style={{ display: 'flex' }}>
                                                <UploadFile
                                                    name={`content_file_${index}`}
                                                    values={values?.content_file}
                                                />
                                                <Button sx={{ bgcolor: '#ced4da', padding: '6px', minWidth: '40px', ml: 2 }} onClick={() => setInputcount(inputcount + 1)}>+</Button>
                                                {
                                                    index > 0 && <Button sx={{ bgcolor: '#ced4da', padding: '6px', minWidth: '40px', ml: 2 }} onClick={() => setInputcount(inputcount - 1)}>-</Button>

                                                }
                                            </div>
                                        </>
                                    )
                                })}


                            </Form>)
                        }}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Add Content
                    </Button>
                </DialogActions>
            </Dialog>

            <DataGrid
                rows={contentdata?.data}
                getRowId={(row) => row._id}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </>
    );
}

export default Content;