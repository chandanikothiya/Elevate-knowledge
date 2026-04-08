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
import { mixed, object, string } from 'yup';
import { addcourse, deletecoures, editcoures, getcourse } from '../../../redux/slice/course.slice';
import { DataGrid } from '@mui/x-data-grid';
import { IMG_URL } from '../../../utility/url';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import { useAddCourseMutation, useDeleteCourseMutation, useGetCourseQuery, useUpdateCourseMutation, useUpdateStatusMutation } from '../../../redux/api/course.api';

function Course(props) {

    const [open, setOpen] = React.useState(false);
    const [updatecourse, setUpdateCourse] = useState({})
    const [inputcount, setInputcount] = useState(1)
    const [files, setfiles] = useState([])
    console.log("fileskk", files)
    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)
    console.log("addda", categorys.category);
    console.log("inputcount", inputcount)

    // const coures = useSelector(state => state.course)
    // console.log("addda", coures.course);

    const { data, error, isLoading } = useGetCourseQuery();
    console.log("datadata", data)

    const [addcourse] = useAddCourseMutation();
    const [editcourse] = useUpdateCourseMutation();
    const [deletecourse] = useDeleteCourseMutation();
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

    categorys?.category?.map((v) => {
        ddata.push({ value: v._id, label: v.name })
    })


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const courseSchema = object({
        category: string().required(),
        name: string().required(),
        description: string().required(),
        price: string().required(),
        week_no: string().required(),
        // course_img: mixed().required()
    })

    function handledelete(id) {
        console.log(id)
        //dispatch(deletecoures(id))
        deletecourse(id)
    }

    function handleedit(data) {
        console.log("edata", data)
        handleClickOpen();
        setUpdateCourse(data)
        console.log("updatecourse", updatecourse)
        setInputcount(updatecourse.course_img.length)
    }

    function handletoggle(data) {
        //console.log(!data.isactive,data)
        updatestatus(data)
    }

    function handlesubmit(values) {
        const insid = JSON.parse(localStorage.getItem("loginuser"))
        console.log("insvalue", values)

        const formdata = new FormData();
        formdata.append("category", values.category);
        formdata.append("name", values.name);
        formdata.append("description", values.description);
        formdata.append("instructor_id", insid._id);
        formdata.append("price",parseInt(values.price) + (values.price * 0.18));
        formdata.append("week_no", values.week_no);
        formdata.append("course_video", values.course_video);

        for (let key in values) {
            if (key.startsWith("course_img") && values[key]) {
                formdata.append("course_img", values[key]);
            }
        }

        if (values.course_img instanceof File) {
            formdata.append("course_img", values.course_img);
        } else {
            //formdata.append("course_img", values.course_img);
        }

        // if (values.course_video instanceof File) {
        //     formdata.append("course_video", values.course_video);
        // } else {
        // }

        if (Object.keys(updatecourse).length > 0) {

            let oldimages = [];
            console.log("updatecourse", oldimages, values)

            const sendkey = Object.fromEntries(
                Object.entries(values).filter(([key]) => key.startsWith('course_img_'))
            )

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
                    console.log("updatecourse",v)
                    notupdateid.push(v.public_id);
                }
            })
            console.log("updatecourse",notupdateid)
            formdata.append("notupdateid",JSON.stringify(notupdateid));


            formdata.append("_id", values._id);
            if (typeof values.course_img === 'object') {
                editcourse(formdata)
            } else {
                editcourse({ formdata })
            }

            //dispatch(editcoures(values))
            console.log("uval", values);
        } else {
            //dispatch(addcourse(values))
            addcourse(formdata)
        }
    }

    const columns = [
        {
            field: "category", headerName: 'category', width: 120,
            renderCell: (params) => {
                // console.log(categorys.category.find(v => v._id === params.row.category))
                return categorys.category.find(v => v._id === params.row.category) ? categorys.category.find(v => v._id === params.row.category).name : ''
            }
        },
        { field: "name", headerName: 'name', width: 180 },
        { field: "description", headerName: 'description', width: 180 },
        {
            field: "course_img", headerName: 'coures image', width: 200,
            renderCell: (params) => (
                <>
                    {console.log("params.row", params)}
                    {/* <img src={params.row.course_img?.url?.includes('blob') ? params.row.course_img :
                        params.row.course_img?.url} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} /> */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {
                            params.row?.course_img?.map((v) => (
                                <img src={v?.url} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} />
                            ))
                        }
                    </div>
                    {/* <img src={params.row?.course_img[0]?.url} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} /> */}

                </>
            )
        },
        {
            field: "course_video", headerName: 'course_video', width: 120,
            renderCell: (params) => (
                <>
                    {console.log("params.row", params)}
                    {/* <img src={params.row.course_img?.url?.includes('blob') ? params.row.course_img :
                        params.row.course_img?.url} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} /> */}
                    <video width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} onClick={() => window.open(params.row?.course_video?.url, '_blank')}>
                        <source
                            src={params.row?.course_video?.url}
                            type="video/mp4" />
                    </video>

                </>
            )
        },
        { field: "price", headerName: 'price', width: 100 },
        { field: "week_no", headerName: 'week_no', width: 100 },
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



    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Course</DialogTitle>
                <DialogContent>

                    <Formik
                        initialValues={Object.keys(updatecourse).length > 0 ? {
                            ...updatecourse,
                            ...updatecourse.course_img?.reduce((acc, img, index) => {
                                acc[`course_img_${index}`] = img;
                                return acc;
                            }, {})
                        } : {
                            category: '',
                            name: '',
                            description: '',
                            price: '',
                            week_no: '',
                            course_video: ""
                        }}
                        validationSchema={courseSchema}
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
                                    name="category"
                                    id="category"
                                    label="Select Category"
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
                                    label="Enter Course Name"
                                />

                                <MyTextField
                                    name="description"
                                    id="description"
                                    label="Enter Description"
                                />

                                <MyTextField
                                    name="price"
                                    id="price"
                                    label="Enter Price"

                                />

                                <MyTextField
                                    name="week_no"
                                    id="week_no"
                                    label="Enter Week No"
                                />

                                {/* <UploadFile
                                    name='course_img'
                                    label="upload image"
                                /> */}

                                <UploadFile
                                    name='course_video'
                                    label="uplaod video"
                                />

                                {Array.from(Array(inputcount)).map((c, index) => {
                                    console.log("one", c, index)
                                    return (
                                        <>
                                            <div style={{ display: 'flex' }}>
                                                <UploadFile
                                                    name={`course_img_${index}`}
                                                    values={values?.course_images}
                                                />
                                                <Button sx={{ bgcolor: '#ced4da', padding: '6px', minWidth: '40px', ml: 2 }} onClick={() => setInputcount(inputcount + 1)}>+</Button>
                                                {
                                                    index > 0 && <Button sx={{ bgcolor: '#ced4da', padding: '6px', minWidth: '40px', ml: 2 }} onClick={() => setInputcount(inputcount - 1)}>-</Button>

                                                }
                                            </div>
                                        </>
                                    )
                                })}


                                <Box sx={{ display: 'flex', fontSize: '20px', alignItems: 'center', mt: 3 }} >
                                    <label htmlFor="gst">GST: </label>
                                    <Typography sx={{ fontSize: '20px' }}>18%</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', fontSize: '20px', alignItems: 'center', mt: 3 }} >
                                    <label htmlFor="gst">Total Price: </label>
                                    <Typography sx={{ fontSize: '20px' }} name="total_price">{parseInt(values.price) + (values.price * 0.18)}</Typography>
                                </Box>

                            </Form>)
                        }}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Add Course
                    </Button>
                </DialogActions>
            </Dialog>

            <DataGrid
                rows={data?.data}
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

export default Course;