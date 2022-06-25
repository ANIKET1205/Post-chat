import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import api from "./api/api";
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './redux/action/UserAction';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import fireDb from './firebase';

function ForgotPass() {
    // var user = useSelector(state => state.user)
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
    const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);
    const initialValues = {
        email: "",
        pass: "",
        cpass: ""
    }

    const retriveData = async () => {
        // const res = await api.get('/users2').then(tocken => { setData(tocken.data); return (tocken.data) });
        // console.log('RES',res);

        fireDb.child('users').on('value', (snap) => {
            if (snap.val() !== null) {
                setData({ ...snap.val() })
            }
            else {
                setData({})
            }
        })

    }

    useEffect(() => {
        retriveData();
    }, [])

    const updatePass = (values) => {
        let user
        let uId
        console.log('d',data)
        Object.keys(data).map((id) => {
            if (data[id].email === values.email) {
                user = data[id]
                uId = id
            }
        })
        console.log('u', user,uId)
        if (user === undefined) {
            alert("Invalid Email ID");
        }
        else {

            user['pass'] = values.pass
            // // dispatch(setUser(user))
            // api.put(`/users2/${user[0].id}`, {'pass':values.pass}).then(alert('Password Changed'))

            fireDb.child(`users/${uId}`).set(user, (err) => {
                if (err) {
                    alert(err)
                }
                else {
                    // console.log('SET SS')
                }
            })


            navigate('/login')
        }
    }

    const onSubmit = (values, onSubmitProps) => {
        // console.log('Form data', values)
        onSubmitProps.setSubmitting('false')
        // onSubmitProps.resetForm()
        updatePass(values)

    }

    const validationSchema = Yup.object({
        email: Yup.string().email('INVALID EMAIL').required("REQUIRED"),
        pass: Yup.string().required('REQUIRED').matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        cpass: Yup.string().required('REQUIRED').matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ).oneOf([Yup.ref('pass'), null], 'Passwords must match')
    })


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    const { handleBlur, handleChange, values } = formik


    return (
        <Box flex={4} sx={{ paddingTop: '120px' }} p={2}>
            <Typography variant='h5' align='center' fontWeight='500'>CHANGE PASSWORD</Typography>
            <Paper elevation={10} sx={{ padding: '20px', marginLeft: { xs: '2%', sm: '10%', md: '5%', lg: '20%' }, marginRight: { xs: '2%', sm: '10%', md: '5%', lg: '20%' }, marginTop: '30px' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid align='center' marginTop={5}>

                        <TextField required label='Email ID' name='email' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.email} placeholder='Enter Your Email ID' error={(formik.errors.email && formik.touched.email)} helperText={formik.errors.email && formik.touched.email ? <>{formik.errors.email}</> : null} fullWidth />
                        <TextField required type={showPassword ? "text" : "password"} label='Password' name='pass' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.pass} placeholder='Enter Your Password' error={(formik.errors.pass && formik.touched.pass)} helperText={formik.errors.pass && formik.touched.pass ? <>{formik.errors.pass}</> : null} fullWidth InputProps={{ // <-- This is where the toggle button is added.
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



                        <TextField required type={showPassword1 ? "text" : "password"} label='Confirm Password' name='cpass' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.cpass} placeholder='Enter Your Password' error={(formik.errors.cpass && formik.touched.cpass)} helperText={formik.errors.cpass && formik.touched.cpass ? <>{formik.errors.cpass}</> : null} fullWidth InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility1"
                                        onClick={handleClickShowPassword1}
                                        onMouseDown={handleMouseDownPassword1}>
                                        {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                        <Button type='submit' color='secondary' variant='contained' fullWidth sx={{ marginTop: '20px', marginBottom: '5px' }}>Update</Button>
                        {/* <Typography><Link to='/forgot'>Forgot Password</Link></Typography>
                    <Typography><Link to='/register'>Register Now / Sing Up</Link></Typography> */}
                        {/* <Typography><Link to='/login'>Login</Link></Typography> */}
                        {/* <Button disabled={flag === 1 ? true : false} type='button' color='secondary' variant='contained' fullWidth sx={{ marginTop: '5px', marginBottom: '5px' }} onClick={handleEditClick}>Edit Profile</Button>
                        <Button disabled={flag === 1 ? true : false} type='button' color='secondary' variant='contained' fullWidth sx={{ marginTop: '5px', marginBottom: '5px' }} onClick={handleChPassClick}>Change Password</Button> */}
                    </Grid>
                </form>
            </Paper>
        </Box>
    )
}

export default ForgotPass