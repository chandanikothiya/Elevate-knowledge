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
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import { useAddCourseMutation, useDeleteCourseMutation, useGetCourseQuery, useUpdateCourseMutation, useUpdateStatusMutation } from '../../../redux/api/course.api';

function Course(props) {

    const [open, setOpen] = React.useState(false);
    const [updatecourse, setUpdateCourse] = useState({})
    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)
    console.log("addda", categorys.category);

    // const coures = useSelector(state => state.course)
    // console.log("addda", coures.course);

    const { data, error, isLoading } = useGetCourseQuery();
    console.log(data)

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
    }, [])



    let ddata = [
        { value: '', label: 'Select Parent Category' }
    ];

    categorys.category.map((v) => {
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
        course_img: mixed().required()
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
    }

    function handletoggle(data) {
        //console.log(!data.isactive,data)
        updatestatus(data)
    }

    function handlesubmit(values) {

        const formdata = new FormData();
        formdata.append("category", values.category);
        formdata.append("name", values.name);
        formdata.append("description", values.description);
        formdata.append("price", values.price);
        formdata.append("week_no", values.week_no);
        formdata.append("course_img", values.course_img);

        if (Object.keys(updatecourse).length > 0) {
            formdata.append("_id", values._id);
            if (typeof values.course_img === 'object') {
                editcourse(formdata)
            } else {
                editcourse(formdata)
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
        { field: "description", headerName: 'description', width: 250 },
        {
            field: "course_img", headerName: 'coures image', width: 120,
            renderCell: (params) => (
                <>
                    {console.log(params.row.course_img)}
                    <img src={params.row.course_img?.includes('blob') ? params.row.course_img :
                        IMG_URL + params.row.course_img} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} />
                </>
            )
        },
        { field: "price", headerName: 'price', width: 120 },
        { field: "week_no", headerName: 'week_no', width: 150 },
        {
            field: 'isactive', headerName: 'isactive', width: 100,
            renderCell: (params) => (
                <>
                    {console.log(params, params.id)}
                    <IconButton aria-label="delete"
                        color="primary"
                        onClick={(e) => handletoggle(params.row)}
                    >
                        <Switch  checked={params.row.isactive}/>
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
                            console.log("fval", values)
                            handlesubmit(values)

                            handleClose();
                            resetForm();
                        }}
                    >
                        <Form id="subscription-form">

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

                            <UploadFile
                                name='course_img'
                            />

                        </Form>
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