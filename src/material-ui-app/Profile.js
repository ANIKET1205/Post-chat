import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import api from "./api/api";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/action/UserAction';
import { useEffect } from 'react';
import fireDb from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const u = useSelector(state => state.user)
    const [user, setUser1] = useState(u)
    const [data, setData] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [flag, setFlag] = useState(0)
    const uId = window.localStorage.getItem('LoginUserId')

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



    useEffect(() => {
        // console.log('user',user)
        retriveData();


        // Object.keys(data).map((id)=>
        //     data[id].email === user.email && data[id].pass === user.pass ? uId=id : null
        // )
        // console.log(uId)

        return () => {
            setData({})
        }
    }, [])

    useEffect(() => {
        Object.keys(data).map((id) =>
            data[id].email === user.email && data[id].pass === user.pass ? setUser1(data[id]) : null
        )

        // console.log('UID',uId)
    }, [data])
    const initialValues = {
        fname: user.fname,
        lname: user.lname,
        gender: user.gender,
        email: user.email,
        mobile: user.mobile,
        pass: user.pass
    }

    const onSubmit = (values, onSubmitProps) => {
        // console.log('Form data', values)
        onSubmitProps.setSubmitting('false')
        // onSubmitProps.resetForm()
        var newValue = { ...values, 'login': true }
        // console.log('new',newValue)



        // api.put(`/users2/${user.id}`,newValue).then(alert('Profile Updated Successfully'))
        fireDb.child(`users/${JSON.parse(uId)}`).set(newValue, (err) => {
            if (err) {
                toast.error(err, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                // console.log('SET SS')
                toast.success('Updated Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })



        // newValue = {...newValue, 'pass':user.pass}
        // newValue={...newValue}
        dispatch(setUser(newValue))
        setUser1(newValue)
        setFlag(0)
        // navigate('/profile')

        // dispatch(addUserDetails(values))
        // addUserDetails(values)
        // navigate('/login')
    }

    const validationSchema = Yup.object({
        fname: Yup.string().required('REQUIRED'),
        lname: Yup.string().required('REQUIRED'),
        // gemder: Yup.string().required('REQUIRED'),
        email: Yup.string().email('INVALID EMAIL').required("REQUIRED"),
        mobile: Yup.string().required('REQUIRED').matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Phone number is not valid"
        ),
        // pass: Yup.string().required('REQUIRED').matches(
        //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        // )
    })


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const handleEditClick = () => {
        setFlag(1)
    }

    const handleChPassClick = () => {
        navigate('/changePass')
    }

    const [imageField, setImageField] = useState("");



    const handleFile = (e) => {
        let files = e.target.files;
        // console.log(files)
        // file reader object to read file as data url
        let reader = new FileReader();
        // reading file as data url
        reader.readAsDataURL(files[0]);
        // this will give base64 image
        // console.log(e.target.files[0]);

        const formData = new FormData();
        formData.append("image", e.target.files[0], e.target.files[0].name)
        formData.append('name', 'Demo')
        // console.log('FORMDATA', formData)
        // api.post('/products',formData)

        reader.onload = (e) => {
            console.log(e.target.result);
            //   imageField = e.target.result
            setImageField(e.target.result)

            let newVar = {...u,"img":e.target.result}
            fireDb.child(`users/${JSON.parse(uId)}`).set(newVar, (err) => {
                if (err) {
                    alert(err)
                }
                else {
                    console.log('Added SS')
                    // navigate('/login')
                }
            })
            //   formik.setFieldValue("image",e.target.result)
        };
    };




    const { handleBlur, handleChange, values } = formik
    return (
        <Box flex={4} sx={{ paddingTop: '100px' }} p={2}>
            <Typography variant='h5' align='center' fontWeight='500'>User Profile</Typography>
            <Stack direction='row' sx={{ paddingBottom: "10px", paddingTop: '30px' }} justifyContent="center">
                <Avatar src={user.img}>{user.fname[0]}</Avatar>
                <Typography variant='h6' sx={{ paddingLeft: "10px", paddingRight: "10px", alignSelf: 'center' }} align='center'>{user.fname === "" ? <>GUEST</> : user.fname}</Typography>
                
            </Stack>
            <Stack direction='row' sx={{ paddingBottom: "10px", paddingTop: '10px' }} justifyContent="center">
            <Button variant="contained" component="label" sx={{ marginBottom: '5px' }}>
                <Typography fontSize='12px'>Update Prifile Picture</Typography>
                <input type="file" hidden name='image' onBlur={handleBlur} onChange={(event) => handleFile(event)} value={values.image} />
            </Button>
                
            </Stack>
            
            <Paper elevation={10} sx={{ padding: '20px', marginLeft: { xs: '2%', sm: '10%', md: '5%', lg: '20%' }, marginRight: { xs: '2%', sm: '10%', md: '5%', lg: '20%' }, marginTop: '30px' }}>
            
                <form onSubmit={formik.handleSubmit}>
                    <Grid align='center' marginTop={5}>
                        <TextField disabled={flag === 0 ? true : false} required label='First Name' name='fname' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.fname} placeholder='Enter Your First Name' error={(formik.errors.fname && formik.touched.fname)} helperText={formik.errors.fname && formik.touched.fname ? <>{formik.errors.fname}</> : null} fullWidth />
                        <TextField disabled={flag === 0 ? true : false} required label='Last Name' name='lname' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.lname} placeholder='Enter Your Last Name' error={(formik.errors.lname && formik.touched.lname)} helperText={formik.errors.lname && formik.touched.lname ? <>{formik.errors.lname}</> : null} fullWidth />
                        <Box marginTop='10px'>
                            <FormControl disabled={flag === 0 ? true : false} required>
                                <FormLabel id='gender-group-label'>
                                    Gender
                                </FormLabel>
                                <RadioGroup required name='gender' onBlur={handleBlur} onChange={handleChange} value={values.gender} aria-labelledby='gender-group-label'>
                                    <FormControlLabel control={<Radio />} label='MALE' value='MALE' />
                                    <FormControlLabel control={<Radio />} label='FEMALE' value='FEMALE' />
                                    <FormControlLabel control={<Radio />} label='OTHER' value='OTHER' />
                                </RadioGroup>
                            </FormControl>

                        </Box>
                        <Box>
                            {formik.errors.gender ? (<Typography variant='body1' color='red'>{formik.errors.gender}</Typography>) : null}</Box>
                        <TextField disabled={flag === 0 ? true : false} required label='Email ID' name='email' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.email} placeholder='Enter Your Email ID' error={(formik.errors.email && formik.touched.email)} helperText={formik.errors.email && formik.touched.email ? <>{formik.errors.email}</> : null} fullWidth />
                        <TextField disabled={flag === 0 ? true : false} required label='Mobile Number' name='mobile' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.mobile} placeholder='Enter Your Mobile Number' error={(formik.errors.mobile && formik.touched.mobile)} helperText={formik.errors.mobile && formik.touched.mobile ? <>{formik.errors.mobile}</> : null} fullWidth />
                        {/* <TextField label='City' variant='standard' placeholder='Enter Your City' fullWidth /> */}


                        <TextField disabled required type="password" label='Password' name='pass' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.pass} placeholder='Enter Your Password' error={(formik.errors.pass && formik.touched.pass)} helperText={formik.errors.pass && formik.touched.pass ? <>{formik.errors.pass}</> : null} fullWidth />
                        <Button disabled={flag === 0 ? true : false} type='submit' color='secondary' variant='contained' fullWidth sx={{ marginTop: '20px', marginBottom: '5px' }}>Update Details</Button>
                        {/* <Typography><Link to='/forgot'>Forgot Password</Link></Typography>
                    <Typography><Link to='/register'>Register Now / Sing Up</Link></Typography> */}
                        {/* <Typography><Link to='/login'>Login</Link></Typography> */}
                        <Button disabled={flag === 1 ? true : false} type='button' color='primary' variant='contained' fullWidth sx={{ marginTop: '5px', marginBottom: '5px' }} onClick={handleEditClick}>Edit Profile</Button>
                        <Button disabled={flag === 1 ? true : false} type='button' color='primary' variant='contained' fullWidth sx={{ marginTop: '5px', marginBottom: '5px' }} onClick={handleChPassClick}>Change Password</Button>
                    </Grid>
                </form>
            </Paper>
            <ToastContainer />
        </Box>
    )
}

export default Profile