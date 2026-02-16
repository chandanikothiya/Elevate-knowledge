import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { verifyuser } from '../../redux/slice/auth.slice';

function Verifyuser(props) {

    const dispatch = useDispatch()

    const verifySchema = object({
        email: string().required(),
        otp: string().required()
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        },
        validationSchema: verifySchema,
        onSubmit: values => {
            console.log(values)
            //dispatch(registeruser(values))
            dispatch(verifyuser(values))
        },
    })

    const { handleSubmit,handleBlur, handleChange, values, touched, errors } = formik;
    console.log(errors, touched)

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '400px', marginLeft: 'auto', alignSelf: "center" }}>

                <h2>Verify Your Email!</h2>
                <p className="lead mb-4">Nice to see you! Please verify with email.</p>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                            <input
                                type="email"
                                name="email"
                                className="form-control border-0 bg-light rounded-end ps-1"
                                placeholder="E-mail"
                                id="exampleInputEmail1"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email ? <span>{errors.email}</span> : ""}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="exampleInputName" className="form-label">OTP</label>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                            <input
                                type="text"
                                name="otp"
                                className="form-control border-0 bg-light rounded-end ps-1"
                                placeholder="Enter OTP"
                                id="exampleInputotp"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.otp && touched.otp ? <span>{errors.otp}</span> : ""}
                        </div>
                    </div>

                    <div className="align-items-center" style={{ marginTop: '40px' }}>
                        <div className="d-grid">
                            <button className="btn btn-primary mb-0" type="submit">Verify</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='imgpart' style={{ width: '600px', backgroundColor: '#E6F0F9', marginLeft: "auto" }}>
                <img src='../public/images/Two factor authentication-pana.png' width={500}></img>
            </div>

        </div>
    );
}

export default Verifyuser;