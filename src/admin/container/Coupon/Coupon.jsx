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
import { object, string, mixed, number, date } from 'yup';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addcategory, deletecategory, editcategory, getcategory } from '../../../redux/slice/category.slice';
import { IMG_URL } from '../../../utility/url';
import { useDeleteCourseMutation, useGetCourseQuery } from '../../../redux/api/course.api';
import { useAddsectionMutation, useDeletesectionMutation, useEditsectionMutation, useGetsectionQuery } from '../../../redux/api/section.api';
import { useAddcouponMutation, useGetallcouponQuery } from '../../../redux/api/coupon.api';


function Coupon(props) {

    const [open, setOpen] = React.useState(false);
    const [categorydata, setCategoryData] = useState([]);
    const [updatecategory, setUpdateCategory] = useState({});

    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)
    // console.log("addda", categorys.category);
    console.log(categorys)
    // console.log(categorydata);

    const { data, error, isLoading } = useGetallcouponQuery();
    console.log("cdata", data);

   

    const [addcoupon] = useAddcouponMutation();

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
        code: string().required(),
        stock: string().required(),
        discount: number().required(),
        expirydate: date().required(),
        description: string().required(),
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

               addcoupon(values)
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
        { field: "code", headerName: 'code', width: 180 },
        { field: "discount", headerName: 'discount', width: 300 },
         { field: "stock", headerName: 'stock', width: 300 },
        { field: "expirydate", headerName: 'expirydate', width: 180 },
        { field: "description", headerName: 'description', width: 300 },
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
                    Add Coupon
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Coupon</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(updatecategory).length > 0 ? updatecategory : {
                                code: "",
                                stock: "",
                                discount: "",
                                expirydate: "",
                                description: "",
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
                                    name="code"
                                    id="code"
                                    label="Enter Coupon Code"
                                />

                                <MyTextField
                                    name="stock"
                                    id="stock"
                                    label="Section Stock"
                                />

                                <MyTextField
                                    name="discount"
                                    id="discount"
                                    label="Discount"
                                    type='number'
                                />

                                <MyTextField
                                    name="expirydate"
                                    id="expirydate"
                                    label="Section Expirydate"
                                    type='date'
                                    InputLabelProps={{ shrink: true, required: true }}
                                />

                                <MyTextField
                                    name="description"
                                    id="description"
                                    label="Description"
                                />

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">
                                        Add Coupon
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

export default Coupon;