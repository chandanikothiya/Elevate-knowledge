import { Button } from '@mui/material';
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useField } from 'formik';
import { IMG_URL } from '../../../utility/url';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function UploadFile(props) {
    console.log("okok")
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers; // Formik's internal state management, specifically the values object.
    console.log("filed", field)
    console.log("filed", field.value?.url?.includes('.mp4'))
    console.log(typeof field.value?.type)

    if (field.value?.type?.startsWith('image/')) {
        console.log("img")
    } else {
        console.log("video")
    }

    // if (field.name.startsWith(course_img)) {

    // }

    let fileurl = ''

    if (typeof field?.value?.url === 'string') {
        fileurl = field.value?.url
        // fileurl = "../public/images/" + field.value
    } else if (typeof field.value === 'object' && field.value) {
        if (Array.isArray(field.value)) {
            console.log("ok")
            fileurl = field.value[0]?.url
        } else {
            console.log("urlpath", field.value)
            fileurl = URL.createObjectURL(field.value);
            console.log(typeof fileurl)

        }

        // fileurl = field.value.url;
        // fileurl = "../public/images/" + field.value.name //also worked
    } else if (Array.isArray(field.value)) {
        console.log("okkkkk")
    }

    console.log("fileurl", fileurl);

    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'block' }}>{props.label}</label>
                <Button
                    style={{ marginTop: '0px' }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <VisuallyHiddenInput
                        {...props}
                        type="file"
                        onChange={(event) => setValue(event.target.files[0])}
                    // onChange={(event) => console.log(event.target.files[0])}
                    />
                </Button>


                {
                    field.value?.type ?
                        field.value?.type?.startsWith('image/') ?
                            <img src={fileurl} alt="Profile-img" width={"50px"} height={"50px"} /> :
                            field.value?.type?.startsWith('video/') &&
                            <video width={"50px"} style={{ display: 'inline-block', width: '50px', height: '50px' }}>
                                <source
                                    src={fileurl}
                                />
                            </video>
                        :
                        field.value?.public_id?.startsWith('course/') ?
                            <img src={fileurl} alt="Profile-img" width={"50px"} height={"50px"} /> :
                            field.value?.public_id?.startsWith('course_video/') &&
                            <video width={"50px"} style={{ display: 'inline-block', width: '50px', height: '50px' }}>
                                <source
                                    src={fileurl}
                                />
                            </video>
                }
                {
                    field.value?.public_id?.startsWith('category/') &&
                    <img src={fileurl} alt="Profile-img" width={"50px"} height={"50px"} />

                }

                {
                    field.value?.type?.includes('pdf') || field.value?.url?.includes('.pdf') ? (
                        <embed src={fileurl} width="50px" height="50px" />
                    ) : field.value?.url?.includes('.mp4') ? (
                        <video
                            width={"50px"} style={{ display: 'inline-block', width: '50px', height: '50px' }}
                            
                        >
                            <source src={fileurl} type="video/mp4" />
                        </video>
                    ) : null
                }


                {meta.error && meta.touched ?
                    <p style={{ color: 'red' }}>{meta.error}</p> : ""}
            </div>
        </>
    );
}

export default UploadFile;