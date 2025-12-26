import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik } from 'formik';
import MyTextField from '../../components/MyTextField/MyTextField';
import UploadFile from '../../components/UploadFile/UploadFile';
import { object, string, mixed } from 'yup';

function Category(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let categoryschema = object({
        name: string().required(),
        description: string().required(),
        categoryimg: mixed().required()
    })

    // console.log(categoryschema);


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
                            initialValues={{
                                name: "",
                                description: "",
                                categoryimg: ""
                            }}
                            validationSchema={categoryschema}
                            onSubmit={(values) => {
                                console.log(values)
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

        </>
    );
}

export default Category;