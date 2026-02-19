import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { boolean, number, object, string } from 'yup';
import { loginuser, registeruser, verifyuser } from '../../redux/slice/auth.slice';


function Auth(props) {

    const [type, setType] = useState('login');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auths = useSelector(state => state.auth)
    console.log(auths)

    // const user = useSelector(state => state.auth.auth);
    // console.log(user.auth)

    // useEffect(() => {
    //     if (user) {
    //         navigate('/verifyuser')
    //     }
    // }, [user])

    let initvalues = {}, auth = {};

    if (type === 'signup') {

        initvalues = {
            name: '',
            email: '',
            password: '',
            cpassword: '',
            terms: false
        }

        auth = {
            name: string().required(),
            email: string().email().required(),
            password: string().required(),
            cpassword: string().required(),
            terms: boolean().required().oneOf([true], 'please select terms')
        }

    } else if (type === 'verify OTP') {
        initvalues = {
            otp: 0
        }

        auth = {
            otp: number().required()
        }
    } else if (type === 'login') {
        initvalues = {
            email: '',
            password: '',
            terms: false
        }

        auth = {
            email: string().email().required(),
            password: string().required(),
            terms: boolean().required().oneOf([true], 'please select terms')
        }
    }

    const formik = useFormik({
        initialValues: initvalues,
        validationSchema: object(auth),
        onSubmit: async values => {
            console.log(values)
            if (type === 'signup') {
                localStorage.setItem("email", values.email)
                const res = await dispatch(registeruser(values))
                if (res.type == 'auth/registeruser/fulfilled') {
                    setType('verify OTP')
                }
                console.log(res)
                
            } else if (type === 'verify OTP') {
                const res = await dispatch(verifyuser({ email: localStorage.getItem("email"), otp: values.otp }))
                console.log(res)
                if (res.type == 'auth/verifyuser/fulfilled') {
                     setType('login')
                }
            } else if (type === 'login') {
                const res = await dispatch(loginuser(values))
                console.log(res)

                if (res.type == 'auth/loginuser/fulfilled') {
                    navigate("/")
                }
            }
        },
    });

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
                        <div className="col-12 col-lg-6 m-auto">
                            <div className="row my-5">
                                <div className="col-sm-10 col-xl-8 m-auto">
                                    {/* Title */}
                                    <img src="assets/images/element/03.svg" className="h-40px mb-2" alt />
                                    <h2>{type} for your account!</h2>
                                    <p className="lead mb-4">Nice to see you! Please {type} with your account.</p>
                                    {/* Form START */}
                                    {/* {
                                        auth.errors && <p>{auth.errors}</p>
                                    } */}
                                    <form onSubmit={handleSubmit}>
                                        {
                                            type === 'signup' || type === 'login' ?
                                                <>
                                                    {
                                                        type === 'signup' &&
                                                        <div className="mb-4">
                                                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                                                            <div className="input-group input-group-lg">
                                                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    className="form-control border-0 bg-light rounded-end ps-1"
                                                                    placeholder="name"
                                                                    id="exampleInputname"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.name}
                                                                />
                                                                {errors.name && touched.name ? <span>{errors.name}</span> : ""}
                                                            </div>
                                                        </div>
                                                    }

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
                                                    {/* Password */}
                                                    <div className="mb-4">
                                                        <label htmlFor="inputPassword5" className="form-label">Password *</label>
                                                        <div className="input-group input-group-lg">
                                                            <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                className="form-control border-0 bg-light rounded-end ps-1"
                                                                placeholder="*********"
                                                                id="inputPassword5"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                            />
                                                            {errors.password && touched.password ? <span>{errors.password}</span> : ""}
                                                        </div>
                                                    </div>

                                                    {
                                                        type === 'signup' &&
                                                        <div div className="mb-4">
                                                            <label htmlFor="inputPassword6" className="form-label">Confirm Password *</label>
                                                            <div className="input-group input-group-lg">
                                                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                                                                <input
                                                                    type="password"
                                                                    name="cpassword"
                                                                    className="form-control border-0 bg-light rounded-end ps-1"
                                                                    placeholder="*********"
                                                                    id="inputPassword6"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.cpassword}
                                                                />
                                                                {errors.cpassword && touched.cpassword ? <span>{errors.cpassword}</span> : ""}
                                                            </div>
                                                        </div>
                                                    }

                                                    {/* Check box */}
                                                    <div className="mb-4">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                name='terms'
                                                                className="form-check-input"
                                                                id="checkbox-1"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                checked={values.terms}
                                                            />
                                                            <label className="form-check-label" htmlFor="checkbox-1">By signing up, you agree to the<a href="#"> terms of service</a></label>
                                                            {errors.terms && touched.terms ? <span>{errors.terms}</span> : ""}
                                                        </div>
                                                    </div>

                                                </> :
                                                <div className="mb-4">
                                                    <label htmlFor="inputPassword5" className="form-label">OTP *</label>
                                                    <div className="input-group input-group-lg">
                                                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                                                        <input
                                                            type="otp"
                                                            name="otp"
                                                            className="form-control border-0 bg-light rounded-end ps-1"
                                                            placeholder="****"
                                                            id="inputotp5"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {errors.otp && touched.otp ? <span>{errors.otp}</span> : ""}
                                                    </div>
                                                </div>
                                        }

                                        <div className="align-items-center mt-0">
                                            <div className="d-grid">
                                                <button className="btn btn-primary mb-0" type="submit">{type}</button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* Form END */}
                                    {/* Social buttons */}
                                    <div className="row">
                                        {/* Divider with text */}
                                        <div className="position-relative my-4">
                                            <hr />
                                            <p className="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
                                        </div>
                                        {/* Social btn */}
                                        <div className="col-xxl-6 d-grid">
                                            <a href="#" className="btn bg-google mb-2 mb-xxl-0"><i className="fab fa-fw fa-google text-white me-2" />Signup with Google</a>
                                        </div>
                                        {/* Social btn */}
                                        <div className="col-xxl-6 d-grid">
                                            <a href="#" className="btn bg-facebook mb-0"><i className="fab fa-fw fa-facebook-f me-2" />Signup with Facebook</a>
                                        </div>
                                    </div>

                                    {
                                        type === 'signup' ?
                                            <div className="mt-4 text-center">
                                                <span>Already have an account?<a href='#' onClick={() => setType('login')}> Sign in here</a></span>
                                            </div> :
                                            <div className="mt-4 text-center">
                                                <span>Already have an account?<a href='#' onClick={() => setType('signup')}> Signup here</a></span>
                                            </div>
                                    }
                                    {/* Sign up link */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </main >

    );
}

export default Auth;