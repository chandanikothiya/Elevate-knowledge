import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Field, Form, Formik } from 'formik';
import { Button, IconButton } from '@mui/material';
import MyTextField from '../../components/MyTextField/MyTextField';
import UploadFile from '../../components/UploadFile/UploadFile';
import { mixed, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editcategory, getcategory } from '../../../redux/slice/category.slice';
import { addsubcategory, deletesubcategory, editsubcategory, getsubcategory } from '../../../redux/slice/subcategory.slice';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SubCategory(props) {
    const [open, setOpen] = React.useState(false);
    const [updatesubcat, setUpdateSubcat] = useState({});
    const dispatch = useDispatch();
    const categorys = useSelector(state => state.category)
    // console.log(category)
    const subcategorys = useSelector(state => state.subcategory)
    // console.log(subcategorys.subcategory)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const subcategory_schema = object({
        category: string().required(),
        subcategory: string().required(),
        description: string().required(),
        subcategory_img: mixed().required()
    })

    function getdata() {
        dispatch(getsubcategory())
    }

    useEffect(() => {
        dispatch(getcategory());
        getdata()
    }, [])

    const category_options = [
        { value: '', label: '--Select Category--' }
    ]

    categorys.category.map((v) => (
        category_options.push({ value: v.id, label: v.name })
    ))

    console.log(category_options)

    function handlesubmit(values) {

        if (Object.keys(updatesubcat).length > 0) {
            if (typeof values.subcategory_img === 'object') {
                dispatch(editsubcategory({ ...values, subcategory_img: values.subcategory_img.name }))
            } else {
                dispatch(editsubcategory(values))
            }
            setUpdateSubcat({})
        } else {
            dispatch(addsubcategory({ ...values, subcategory_img: values.subcategory_img.name }))
        }
    }

    function handleDelete(id) {
        dispatch(deletesubcategory(id))
    }

    function handleEdit(data) {
        handleClickOpen();
        setUpdateSubcat(data);

    }

    const columns = [
        { field: "subcategory", headerName: 'Subcategory', width: 180 },
        { field: "category", headerName: 'Category', width: 180,
            renderCell:(params) => {
                console.log(params.row);
                console.log(categorys.category)
                const fdata = categorys.category.find((v) => v.id === params.row.category)
                //console.log(fdata.name)
                
                return fdata?.name
            }
         },
        { field: "description", headerName: 'Description', width: 180 },
        {
            field: "subcategory_img", headerName: 'Subcategory_img', width: 180,
            renderCell: (params) => (
                // console.log(params.row.subcategory_img)
                <img src={'../public/images/' + params.row.subcategory_img} width={'80px'} height={'50px'} style={{ objectFit: 'contain' }} />
            )
        },
        {
            headerName: 'Action', width: 200,
            renderCell: (params) => (
                <>
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
        <div>
            <h2>Sub-Category</h2>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add SubCategory
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>SubCategory</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(updatesubcat).length > 0 ? updatesubcat : {
                                category: "",
                                subcategory: "",
                                description: "",
                                subcategory_img: ""
                            }}
                            validationSchema={subcategory_schema}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values)
                                handlesubmit(values);
                                handleClose();
                                resetForm();
                            }}
                        >
                            <Form>

                                <MyTextField
                                    name="category"
                                    id="category"
                                    label="Select Category"
                                    select
                                    InputLabelProps={{ shrink: true, required: true }}
                                    slotProps={{
                                        select: {
                                            native: true,
                                        },
                                    }}
                                    data={category_options}
                                />

                                <MyTextField
                                    name="subcategory"
                                    id="subcategory"
                                    label="SubCategory"
                                />

                                <MyTextField
                                    name="description"
                                    id="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                />

                                <UploadFile
                                    name="subcategory_img"
                                />

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">
                                        Add SubCategory
                                    </Button>
                                </DialogActions>
                            </Form>
                        </Formik>
                    </DialogContent>
                </Dialog>
            </React.Fragment>

            <DataGrid
                rows={subcategorys.subcategory}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </div>
    );
}

export default SubCategory;