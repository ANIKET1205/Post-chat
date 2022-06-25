import { Avatar, Box, Button, Grid, Icon, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import api from "./api/api";
import { useState } from 'react';
import { setUser } from './redux/action/UserAction'
import { useDispatch } from 'react-redux';
import { userReducer } from './redux/reducer/UserReducer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import fireDb from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Google from '@mui/icons-material/Google';

function Login() {
    const [data, setData] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const l = window.localStorage.getItem('materialLogin')

    const responseFacebook = (response) => {
        // console.log(response.picture["data"].url);
        if (response) {
            let fname1, lname1
            [fname1, lname1] = response.name.split(" ")

            let newObj = {
                fname: fname1,
                lname: lname1,
                email: response.email,
                gender: 'MALE',
                mobile: '0000000000',
                login: true,
                pass: response.email,
                facebookId: response.id,
                img:response.picture["data"].url
            }
            let flag
            Object.keys(data).map((id) => {
                if (data[id].facebookId) {
                    if (data[id].facebookId === response.id) {
                        flag = id
                        data[id].login=true
                        fireDb.child(`users/${id}`).set(data[id], (err) => {
                            if (err) {
                                alert(err)
                            }
                            else {
                                // console.log('Added SS')
                                // navigate('/login')
                            }
                        })
                    }
                }
            })
            if (flag !== undefined) {
                window.localStorage.setItem('LoginUserId', JSON.stringify(flag))
            }
            else {
                fireDb.child('users').push(newObj, (err) => {
                    if (err) {
                        alert(err)
                    }
                    else {
                        // console.log('Added SS')
                        // navigate('/login')
                    }
                })
            }

            window.localStorage.setItem('materialLogin', JSON.stringify({ email: newObj.email, pass: newObj.pass }))
            dispatch(setUser(newObj))
            navigate('/')
            // console.log(response.id)
        }
    }
    const componentClicked = (data1) => {
        // console.warn(data1)
    }
    const responseGoogle = (response) => {
        console.log('google', response);
    }

    const responseGoogle1 = (response) => {
        console.log('googleError', response);
    }


    const retriveData = async () => {
        // const res = await api.get('/users2').then(tocken => { setData(tocken.data); return (tocken.data) });
        fireDb.child('users').on('value', (snap) => {
            if (snap.val() !== null) {
                setData({ ...snap.val() })
            }
            else {
                setData({})
            }
        })
        // console.log('RES',res);
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    useEffect(() => {

        if (!l) {
            retriveData();

            // window.google.accounts.id.initialize({
            //     client_id:'681062169087-qkgr8ugpt79pjuhimdec2bu0ljb4skgi.apps.googleusercontent.com',
            //     callback: responseGoogle
            // })
            // window.Google.accounts.id.renderButton(
            //     document.getElementById("signIn"),
            //     {
            //         theme:'outline',size:'large'
            //     }
            // )
            return () => {
                setData({})
            }
        }




    }, [])
    useEffect(() => {

        if (l) {
            // alert("Bscsvsv")
            const login = JSON.parse(l)
            Object.keys(data).map((id) => {
                if (data[id].facebookId) {
                    if (data[id].email === login.email && data[id].login === true) {
                        dispatch(setUser(data[id]))
                        navigate('/')
                    }
                }

            })
        }

    }, [data])

    // const validateUser=(values)=> {
    //     data.map((d) => {
    //         if(d.email === values.email && d.pass===values.pass){
    //             console.log('INSIDE');
    //             d.login=true;
    //             console.log(d)
    //             setUser(d)
    //         }

    //     });
    //     // console.log('redv',data);
    //     window.localStorage.setItem('materialLogin',JSON.stringify(values.email))
    //     // setUser(data);
    //     navigate('/');
    // }


    const initialValues = {
        email: "",
        pass: ""
    }

    const onSubmit = (values, onSubmitProps) => {
        // console.log('Form data', values)
        onSubmitProps.setSubmitting('false')
        onSubmitProps.resetForm()
        // validateUser(values)
        let flag = 0

        Object.keys(data).map((id) => {
            // console.log(data[id].email)
            if (data[id].email === values.email && data[id].pass === values.pass) {
                flag = 1
                // console.log('INSIDE');
                data[id].login = true;
                dispatch(setUser(data[id]))
                // api.put(`/users2/${d.id}`, { 'login': true }).then()
                fireDb.child(`users/${id}`).set(data[id], (err) => {
                    if (err) {
                        alert(err)
                    }
                    else {
                        // console.log('SET SS')
                    }
                })
                // console.log(d)

                toast.success('Login Successfull!', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                window.localStorage.setItem('materialLogin', JSON.stringify(values))
                window.localStorage.setItem('LoginUserId', JSON.stringify(id))
                // setTimeout(navigate('/'),5000)
                navigate('/');
                return;
            }
        });
        if (flag === 0) {

            toast.error('Invalid UserId or Password!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
        // console.log('redv',data);

        // setUser(data);


        // dispatch(addUserDetails(values))
        // addUserDetails(values)
        // navigate('/login')
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('INVALID EMAIL').required("REQUIRED"),
        pass: Yup.string().required('REQUIRED').matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
    })


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    const { handleBlur, handleChange, values } = formik




    return (
        <Grid sx={{ width: { xs: '60%', sm: '50%', md: '50%', lg: '40%' }, flex: { xs: '1', sm: '1', md: '4', lg: '4' }, marginBottom: '100px' }}>
            <Paper elevation={10} sx={{ padding: '20px', marginLeft: { xs: '10%', sm: '15%', md: '5%', lg: '20%' }, marginRight: { xs: '10%', sm: '15%', md: '5%', lg: '20%' }, marginTop: '100px' }}>
                <Grid align='center'>
                    <Avatar sx={{ bgcolor: '#2f9f80' }}> <LockIcon /></Avatar>
                    <Typography variant='h5' fontWeight={700}>SingIn</Typography>
                </Grid>
                <Grid align='center' marginTop={5}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField label='User ID' variant='standard' placeholder='Enter Your User Id' fullWidth name='email' onBlur={handleBlur} onChange={handleChange} value={values.email} error={(formik.errors.email && formik.touched.email)} helperText={formik.errors.email && formik.touched.email ? <>{formik.errors.email}</> : null} />
                        <TextField type={showPassword ? "text" : "password"} label='Password' variant='standard' placeholder='Enter Your Password' fullWidth name='pass' onBlur={handleBlur} onChange={handleChange} value={values.pass} error={(formik.errors.pass && formik.touched.pass)} helperText={formik.errors.pass && formik.touched.pass ? <>{formik.errors.pass}</> : null} InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                        <Button type='submit' color='secondary' variant='contained' fullWidth sx={{ marginTop: '20px', marginBottom: '20px' }}>Sing In</Button>
                        <Grid>
                            <Typography variant='body2'>Login With</Typography>
                            {/* <IconButton size='large'> */}
                            <Box>
                                <GoogleLogin
                                    clientId="681062169087-qkgr8ugpt79pjuhimdec2bu0ljb4skgi.apps.googleusercontent.com"
                                    // buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle1}
                                    cookiePolicy={'single_host_origin'}
                                />

                                {/* <div id="signIn"></div> */}
                            </Box>
                            {/* <GoogleIcon sx={{ color: 'red' }} /> */}
                            {/* </IconButton> */}
                            {/* <IconButton size='large' > */}
                            <Box sx={{ marginY: '10px' }}>
                                <FacebookLogin
                                    appId="5464068050310862"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    onClick={componentClicked}
                                    callback={responseFacebook} size='small' />
                                {/* <FacebookIcon sx={{ color: '#3f51b5' }} /> */}
                            </Box>
                            {/* </IconButton> */}
                        </Grid>
                        <Typography><Link to='/forgot'>Forgot Password</Link></Typography>
                        <Typography><Link to='/register'>Register Now / Sing Up</Link></Typography>
                    </form>
                </Grid>

            </Paper>
            <ToastContainer />
        </Grid>
    )
}

export default Login






// "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."


// import React, { useEffect } from 'react';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';
// import { validateUSer } from '../redux/action/UserAction';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import api from "../api/users";

// function Login() {
//     const data = useSelector(state => state.addUser)
//     const navigate = useNavigate();
//     // const dispatch = useDispatch();

//     var initialData = []
//     // const response = api.get('/users');
//     // console.log('L users data', response.data)
//     // var initialData = response.data
//     const retriveUsers = () => {
//         // console.log('HIh',api.get('/contact'))
//         const response = api.get('/users');
//         console.log('L users data', response.data)
//         initialData = response.data
//         // return response.data;
//     }
//     // retriveUsers();
//     useEffect(() => {
//         console.log('casd')
//         retriveUsers();
//     }, [])


//     const loginPerform = async (data) => {
//         if(data.email === 'admin@gmail.com' && data.password === 'Admin@123'){
//             window.localStorage.setItem("Admin",data)
//             navigate('/admin');
//             window.location.reload();
//             return;
//         }
//         const response = await api.get('/users');
//         console.log('L users data', response.data)
//         initialData = response.data

//         console.log('ini', initialData)
//         const validateUser = initialData.filter((Idata) => Idata.email === data.email && Idata.password === data.password)
//         console.log('VV', validateUser)
//         if (validateUser.length === 0) {
//             console.log("User not Exist", validateUser)
//             alert("User Not Exists")
//         }
//         else {
//             console.log("User Exist", validateUser)
//             window.localStorage.setItem("Login", JSON.stringify(validateUser))
//             navigate('/');
//             // return validateUser
//         }
//     }
//     const initialValues = {
//         email: '',
//         password: ''
//     }
//     useEffect(() => {
//         let login = window.localStorage.getItem('Login');
//         // console.log("LLL", JSON.parse(login))
//         if (login) {
//             navigate('/')
//         }
//     }, [])
//     useEffect(() => {
//         let login = window.localStorage.getItem('Login');
//         if (login) {
//             navigate('/')
//         }
//     }, [data])

//     const onSubmit = (values, onSubmitProps) => {
//         console.log('Form data', values)
//         onSubmitProps.setSubmitting('false')
//         onSubmitProps.resetForm()
//         // dispatch(validateUSer(values))
//         loginPerform(values)

//     }

//     const validationSchema = Yup.object({
//         email: Yup.string().email('INVALID EMAIL').required("REQUIRED"),
//         password: Yup.string().required('REQUIRED').matches(
//             /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
//             "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
//         )

//     })

//     const formik = useFormik({
//         initialValues,
//         onSubmit,
//         validationSchema
//     })



//     // const { handleBlur, handleChange, values } = formik
//     return (
//         <div className='bg-dark p-2 text-white '>
//             <div className='row'>
//                 <div className='border border-white bg-warning text-dark text-lg p-4 m-5 rounded mx-auto shadow col-lg-5 col-md-7 col-sm-9 col-xs-11 login-box'>
//                     <h3 className='bg-black text-white d-inline-block p-2 rounded mx-auto shadow shadow-intensity-xl'>Login Form</h3>
//                     <div className=''>
//                         <form onSubmit={formik.handleSubmit}>
//                             <div className='form-group'>
//                                 <label htmlFor="email">User ID : </label>
//                                 <input type='text' name="email" id="email" className='form-control mx-auto' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
//                                 {formik.errors.email && formik.touched.email ? (<div className='bg-danger text-light mx-auto mb-3 rounded err'>{formik.errors.email}</div>) : null}
//                             </div>
//                             <div className='form-group'>
//                                 <label htmlFor="password">Password : </label>
//                                 <input type='text' name="password" id="password" className='form-control mx-auto' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
//                                 {formik.errors.password && formik.touched.password ? (<div className='bg-danger text-light mx-auto mb-3 rounded err'>{formik.errors.password}</div>) : null}
//                             </div>
//                             <button type="submit" className='btn btn-primary border mt-4 shadow l-btn'>LOGIN</button>
//                         </form>
//                     </div>
//                     <Link to="/forgot-pass" >Forgot Password</Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login