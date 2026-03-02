import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import MyTextField from '../../admin/components/MyTextField/MyTextField';
import UploadFile from '../../admin/components/UploadFile/UploadFile';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory } from '../../redux/slice/category.slice';
import { addcourse, editcoures, getcourse } from '../../redux/slice/course.slice';
import { mixed, object, string } from 'yup';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function InstructoreAddCourse(props) {

    const [updatecourse, setUpdateCourse] = useState({})
    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)
    console.log("addda", categorys.category);

    const lu = localStorage.getItem('loginuser')
    const x = JSON.parse(lu)
    console.log("lu",)
    
    const navigate = useNavigate();

    const coures = useSelector(state => state.course)
    console.log("addda", coures.course);

    const getdata = async () => {
        dispatch(getcategory())
        dispatch(getcourse())
    }

    useEffect(() => {
        getdata()
    }, [])



    let data = [
        { value: '', label: 'Select Parent Category' }
    ];

    categorys.category.map((v) => {
        data.push({ value: v._id, label: v.name })
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
        course_img: mixed().required()
    })

    function handledelete(id) {
        dispatch(deletecoures(id))
    }

    function handleedit(data) {
        console.log(data)
        handleClickOpen();
        setUpdateCourse(data)
    }

    const handlesubmit = async (values) => {
        if (Object.keys(updatecourse).length > 0) {
            dispatch(editcoures(values))
           
        } else {
            const res = await dispatch(addcourse({...values,instructor_id:x._id}))
            console.log("res", res)
            if (res.type === 'course/addcourse/fulfilled') {
                navigate('/instructorManageCourse')
            }

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
        { field: "description", headerName: 'description', width: 250 },
        {
            field: "course_img", headerName: 'coures image', width: 120,
            renderCell: (params) => (
                <>
                    {console.log(params.row.course_img)}
                    <img src={IMG_URL + params.row.course_img} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} />
                </>
            )
        },
        { field: "price", headerName: 'price', width: 120 },
        { field: "week_no", headerName: 'week_no', width: 150 },
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
            <div className="container-fluid">
                <div className="row">
                    {/* left */}
                    <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
                        <div className="p-3 p-lg-5">
                            {/* Title */}
                            <div className="text-center">
                                <h2 className="fw-bold">Welcome to our largest community</h2>
                                <p className="mb-0 h6 fw-light">Let's learn something new today!</p>
                            </div>
                            {/* SVG Image */}
                            <img src="assets/images/element/02.svg" className="mt-5" alt />
                            {/* Info */}
                            <div className="d-sm-flex mt-5 align-items-center justify-content-center">
                                <ul className="avatar-group mb-2 mb-sm-0">
                                    <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" /></li>
                                    <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt="avatar" /></li>
                                    <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="avatar" /></li>
                                    <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt="avatar" /></li>
                                </ul>
                                {/* Content */}
                                <p className="mb-0 h6 fw-light ms-0 ms-sm-3">4k+ Students joined us, now it's your turn.</p>
                            </div>
                        </div>
                    </div>
                    {/* Right */}
                    <div className="col-12 col-lg-6 m-auto">
                        <div className="row my-5">
                            <div className="col-sm-10 col-xl-8 m-auto">
                                {/* Title */}
                                <h2>Add Course</h2>

                                <Formik
                                    initialValues={Object.keys(updatecourse).length > 0 ? updatecourse : {
                                        category: '',
                                        name: '',
                                        description: '',
                                        price: '',
                                        week_no: '',
                                        course_img: ''
                                    }}
                                    validationSchema={courseSchema}
                                    onSubmit={(values, { resetForm }) => {
                                        console.log(values)
                                        handlesubmit(values)
                                        resetForm();
                                    }}
                                >
                                    <Form id="courseadd-form" >

                                        <MyTextField
                                            name="category"
                                            id="category"
                                            label="Select Category"
                                            InputLabelProps={{ shrink: true, required: true }}
                                            select
                                            data={data}
                                            slotProps={{
                                                select: {
                                                    native: true,
                                                },
                                            }}
                                            variant="filled"
                                        />

                                        <MyTextField
                                            name="name"
                                            id="name"
                                            label="Enter Course Name"
                                            variant="filled"
                                            style={{ margin: '20px 0 0  0' }}
                                        />

                                        <MyTextField
                                            name="description"
                                            id="description"
                                            label="Enter Description"
                                            variant="filled"
                                            style={{ margin: '20px 0 0  0' }}
                                        />

                                        <MyTextField
                                            name="price"
                                            id="price"
                                            label="Enter Price"
                                            variant="filled"
                                            style={{ margin: '20px 0 0  0' }}
                                        />

                                        <MyTextField
                                            name="week_no"
                                            id="week_no"
                                            label="Enter Week No"
                                            variant="filled"
                                            style={{ margin: '20px 0 0  0' }}
                                        />

                                        <UploadFile
                                            name='course_img'

                                        />

                                        <Button variant="contained" type="submit" style={{ display: 'block', margin: '30px auto 0 auto', width: '400px', }}>Add Course</Button>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InstructoreAddCourse;