import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { number, object, string } from 'yup';
import { forgetpassword, resetpassword, verifyemail } from '../../redux/slice/auth.slice';
import { useNavigate } from 'react-router-dom';

function ForgetPassword(props) {

    const [type, Settype] = useState('sent OTP');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let initvalues = {}, schema = {};

    if (type === 'sent OTP') {
        initvalues = {
            email: ''
        }

        schema = {
            email: string().email().required()
        }
    } else if (type === 'verify OTP') {
        initvalues = {
            otp: ''
        }

        schema = {
            otp: number().required()
        }
    } else if (type === 'reset password') {
        initvalues = {
            password: '',
            cpassword: ''
        }

        schema = {
            password: string().required(),
            cpassword: string().required()
        }
    }


    // const emailschem = object({
    //     email: string().email().required()
    // })


    const formik = useFormik({
        initialValues: initvalues,
        validationSchema: object(schema),
        enableReinitialize: true,
        onSubmit: async values => {
            console.log(values)
            if (type === 'sent OTP') {
                localStorage.setItem("email", values.email)
                const res = await dispatch(forgetpassword(values))
                console.log(res)
                if (res.type == 'auth/forgetpassword/fulfilled') {
                    Settype('verify OTP')
                }

            } else if (type === 'verify OTP') {
                const res = await dispatch(verifyemail({ email: localStorage.getItem("email"), otp: values.otp }))
                if (res.type == 'auth/verifyemail/fulfilled') {
                    Settype('reset password')
                }
            } else if (type === 'reset password') {
                const res = await dispatch(resetpassword({ email: localStorage.getItem("email"), password:values.password}))
                if (res.type == 'auth/resetpassword/fulfilled') {
                    navigate("/auth")
                }
            }
        },
    });
    console.log(type)
    const { handleSubmit, handleBlur, handleChange, values, touched, errors } = formik;
    console.log(errors, touched)

    return (
        <main>
            <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
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
                        <div className="col-12 col-lg-6 d-flex justify-content-center">
                            <div className="row my-5">
                                <div className="col-sm-10 col-xl-12 m-auto">
                                    {/* Title */}
                                    <span className="mb-0 fs-1">🤔</span>
                                    <h1 className="fs-2">Forgot Password?</h1>
                                    <h5 className="fw-light mb-4">To receive a new password, enter your email address below.</h5>
                                    {/* Form START */}
                                    <form onSubmit={handleSubmit}>
                                        {/* Email */}
                                        {
                                            type === 'sent OTP' || type === 'verify OTP' ?
                                                <>
                                                    {
                                                        type === 'sent OTP' &&
                                                        <div className="mb-4">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
                                                            <div className="input-group input-group-lg">
                                                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                                                <input
                                                                    type="email"
                                                                    name='email'
                                                                    className="form-control border-0 bg-light rounded-end ps-1"
                                                                    placeholder="E-mail"
                                                                    id="exampleInputEmail1"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                {errors.email && touched.email ? <span>{errors.email}</span> : ""}

                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        type === 'verify OTP' &&
                                                        <div className="mb-4">
                                                            <label htmlFor="exampleInputEmail1" className="form-label">OTP *</label>
                                                            <div className="input-group input-group-lg">
                                                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                                                <input
                                                                    type="otp"
                                                                    name='otp'
                                                                    className="form-control border-0 bg-light rounded-end ps-1"
                                                                    placeholder="OTP"
                                                                    id="exampleInputotp"
                                                                    value={values.otp}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                {errors.otp && touched.otp ? <span>{errors.otp}</span> : ""}

                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <div className="mb-4">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">New Password *</label>
                                                        <div className="input-group input-group-lg">
                                                            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                                            <input
                                                                type="password"
                                                                name='password'
                                                                className="form-control border-0 bg-light rounded-end ps-1"
                                                                placeholder="New Password"
                                                                id="exampleInputpassword"
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {errors.password && touched.password ? <span>{errors.password}</span> : ""}

                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Confirm Password *</label>
                                                        <div className="input-group input-group-lg">
                                                            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                                            <input
                                                                type="password"
                                                                name='cpassword'
                                                                className="form-control border-0 bg-light rounded-end ps-1"
                                                                placeholder="Confirm Password"
                                                                id="exampleInputpassword"
                                                                value={values.cpassword}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {errors.cpassword && touched.cpassword ? <span>{errors.cpassword}</span> : ""}

                                                        </div>
                                                    </div>
                                                </>

                                        }

                                        {/* Button */}
                                        <div className="align-items-center">
                                            <div className="d-grid">
                                                <button className="btn btn-primary mb-0" type="submit">{type}</button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* Form END */}
                                </div>
                            </div> {/* Row END */}
                        </div>
                    </div> {/* Row END */}
                </div>
            </section>
        </main>

    );
}

export default ForgetPassword;