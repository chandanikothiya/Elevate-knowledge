import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Form, Formik } from 'formik';
import MyTextField from '../../components/MyTextField/MyTextField';
import UploadFile from '../../components/UploadFile/UploadFile';
import { object, string, mixed, number } from 'yup';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addcategory, deletecategory, editcategory, getcategory } from '../../../redux/slice/category.slice';
import { IMG_URL } from '../../../utility/url';
import { useDeleteCourseMutation, useGetCourseQuery } from '../../../redux/api/course.api';
import { useAddsectionMutation, useDeletesectionMutation, useEditsectionMutation, useGetsectionQuery } from '../../../redux/api/section.api';


function Section(props) {

    const [open, setOpen] = React.useState(false);
    const [categorydata, setCategoryData] = useState([]);
    const [updatecategory, setUpdateCategory] = useState({});

    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)
    // console.log("addda", categorys.category);
    console.log(categorys)
    // console.log(categorydata);

    const { data, error, isLoading } = useGetCourseQuery();
    console.log("cdata", data);

    const { data: sdata, error: serror, isLoading: sisloading } = useGetsectionQuery();

    const [addsection] = useAddsectionMutation();
    const [editsection] = useEditsectionMutation();
    const [deletesection] = useDeletesectionMutation();

    let cdata = [
        { value: '', label: 'Select Parent Category' }
    ];

    data?.data?.map((v, i) => {

        // if (v !== null) {
        console.log(v?._id)

        cdata.push({ value: v?._id, label: v?.name })
        // }
    })
    console.log(cdata)

    let order_no = [
        { value: '', label: 'Select Order No' }
    ]

    for (let i = 0; i <= 10; i++) {
        order_no.push({ value: i, label: i })
    }

    console.log("order_no", order_no)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getdata = async () => {
        // const response = await fetch("http://localhost:3000/category");
        // const data = await response.json();
        // setCategoryData(data);

        dispatch(getcategory())
    }

    useEffect(() => {
        getdata();
    }, []);

    let categoryschema = object({
        course_id: string().required(),
        name: string().required(),
        order_no: number().required(),

        // .test("categoryimg","only jpeg,png,jpg",function(value) {
        //     const arr = ['image/jpeg','image/png','image/jpg']
        //     console.log(value);
        //     return value.includes(arr);

        // }),
        // parentcategory:string().required()
    })

    // console.log(categoryschema);

    const handleSubmit = async (values) => {
        console.log("vvvv", values)
        try {
            if (Object.keys(updatecategory).length > 0) {

                editsection(values)

                setUpdateCategory({});

            } else {

                console.log("vvv", values);
                addsection(values)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (data) => {
        console.log(data);

        handleClickOpen();
        setUpdateCategory(data)
    }

    const handleDelete = async (id) => {
        deletesection(id)
    }

    const columns = [
        { field: "name", headerName: 'name', width: 180 },
        { field: "order_no", headerName: 'order_no', width: 300 },
         
        {
            field: "course_id", headerName: 'course_id', width: 300,
            renderCell: (params) => (
                <>
                    {console.log(params, params.row.course_id)}
                    {params.row.course_id !== null && data?.data?.find((v) => v._id === params.row.course_id).name }
                    {/* {
                       categorys.category.find((v) => v._id === params.row.parent_category_id)
                    } */}
                </>
            )
        },
        {
            field: 'Action', headerName: 'Action', width: 200,
            renderCell: (params) => (
                <>
                    {console.log(params, params.id)}
                    <IconButton aria-label="delete"
                        onClick={(e) => handleEdit(params.row)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete"
                        onClick={(e) => handleDelete(params.row._id)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },

    ]
    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
            <h2>Category</h2>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Category
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Category</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(updatecategory).length > 0 ? updatecategory : {
                                course_id: "",
                                name: "",
                                order_no: "",
                            }}
                            validationSchema={categoryschema}
                            onSubmit={(values, { resetForm }) => {
                                console.log("valuesvalues", values)
                                handleSubmit(values);
                                handleClose();
                                resetForm();
                            }}
                        >
                            <Form>
                                <MyTextField
                                    name="course_id"
                                    id="courseid"
                                    label="Select Course"
                                    select
                                    data={cdata}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    slotProps={{
                                        select: {
                                            native: true,
                                        },
                                    }}

                                />

                                <MyTextField
                                    name="name"
                                    id="name"
                                    label="Section Name"
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

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">
                                        Add Category
                                    </Button>
                                </DialogActions>
                            </Form>
                        </Formik>
                    </DialogContent>
                </Dialog>
            </React.Fragment>

            <DataGrid
                rows={sdata?.data}
                getRowId={(row) => row?._id || Math.random()}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </>
    );
}

export default Section;