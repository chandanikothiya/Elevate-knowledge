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
import { object, string, mixed } from 'yup';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addcategory, deletecategory, editcategory, getcategory } from '../../../redux/slice/category.slice';
import { IMG_URL } from '../../../utility/url';


function Category(props) {

    const [open, setOpen] = React.useState(false);
    const [categorydata, setCategoryData] = useState([]);
    const [updatecategory, setUpdateCategory] = useState({});

    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)
    console.log("addda", categorys.category);


    console.log(categorydata);

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
        name: string().required(),
        description: string().required(),
        category_img: mixed().required()
        // .test("categoryimg","only jpeg,png,jpg",function(value) {
        //     const arr = ['image/jpeg','image/png','image/jpg']
        //     console.log(value);
        //     return value.includes(arr);

        // })
    })

    // console.log(categoryschema);

    const handleSubmit = async (values) => {

        try {
            if (Object.keys(updatecategory).length > 0) {

                if (typeof values.categoryimg === 'object') {
                    dispatch(editcategory(values))
                } else {
                    dispatch(editcategory(values))
                }

                setUpdateCategory({});

            } else {

                console.log("vvv",values);
                
                dispatch(addcategory(values))
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
        dispatch(deletecategory(id))
    }

    const columns = [
        { field: "name", headerName: 'name', width: 180 },
        { field: "description", headerName: 'description', width: 300},
        //  { field: "categoryimg", headerName: 'categoryimg', width: 150},
        {
            field: "category_img", headerName: 'categoryimg', width: 120,
            renderCell: (params) => (
                <>
                    {console.log(params.row.category_img)}
                    <img src={IMG_URL + params.row.category_img} width={"50px"} height={"50px"} style={{ objectFit: 'cover' }} />
                </>
            )
        },
        {
            field: 'Action', headerName: 'Action', width: 200,
            renderCell: (params) => (
                <>
                    {console.log(params)}
                    <IconButton aria-label="delete"
                        onClick={(e) => handleEdit(params.row)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete"
                        onClick={(e) => handleDelete(params.row.id)}
                        color="error"
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
                                name: "",
                                description: "",
                                category_img: ""
                            }}
                            validationSchema={categoryschema}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values)
                                handleSubmit(values);
                                handleClose();
                                resetForm();
                            }}
                        >
                            <Form>
                                <MyTextField
                                    name="name"
                                    id="name"
                                    label="Category Name"
                                />

                                <MyTextField
                                    name="description"
                                    id="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                />

                                <UploadFile
                                    name="category_img"
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
                rows={categorys.category}
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

export default Category;