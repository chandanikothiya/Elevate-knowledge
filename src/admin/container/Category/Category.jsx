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


function Category(props) {

    const [open, setOpen] = React.useState(false);
    const [categorydata, setCategoryData] = useState([]);
    const [updatecategory, setUpdateCategory] = useState({});
    console.log(categorydata);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getdata = async () => {
        const response = await fetch("http://localhost:3000/category");
        const data = await response.json();
        setCategoryData(data);
    }

    useEffect(() => {
        getdata();
    }, []);

    let categoryschema = object({
        name: string().required(),
        description: string().required(),
        categoryimg: mixed().required()
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

                console.log(values.categoryimg.name);
                
                let newvalue = {...values}

                if (typeof values.categoryimg === 'object') {
                    newvalue = {...values,categoryimg : values.categoryimg.name}
                }

                const response = await fetch(`http://localhost:3000/category/${updatecategory.id}`, {
                    method: "PUT",
                    body: JSON.stringify(newvalue),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                const udata = [...categorydata];

                const index = udata.findIndex((v) => v.id === data.id);
                udata[index] = data;

                setCategoryData(udata);
                setUpdateCategory({});

            } else {
                const category = { ...values, categoryimg: values.categoryimg.name }

                const response = await fetch("http://localhost:3000/category", {
                    method: "POST",
                    body: JSON.stringify(category),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                setCategoryData([...categorydata, data])
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
        console.log(id);
        const response = await fetch(`http://localhost:3000/category/${id}`, {
            method: "DELETE"
        })

        const data = [...categorydata];
        const udata = data.filter((v) => v.id !== id)
        setCategoryData(udata)
    }

    const columns = [
        { field: "name", headerName: 'name', width: 180 },
        { field: "description", headerName: 'description', width: 150 },
        //  { field: "categoryimg", headerName: 'categoryimg', width: 150},
        { field: "categoryimg", headerName: 'categoryimg', width: 120,
              renderCell: (params) => (
                <>
                {console.log(params.row.categoryimg)}
                 <img src={"../public/images/" + params.row.categoryimg} width={"50px"} height={"50px"} />
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
                                categoryimg: ""
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
                                    name="categoryimg"
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
                rows={categorydata}
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