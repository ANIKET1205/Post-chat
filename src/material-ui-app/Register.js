import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Icon, IconButton, InputAdornment, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import api from "./api/api";
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import fireDb from './firebase';




function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();



    const addUserDetails =(values)=>{
        const newValue = {...values,'login':false}
        // console.log('new',newValue)
        // api.post('/users2',newValue)

        fireDb.child('users').push(newValue,(err)=>{
            if(err){
                alert(err)
            }
            else{
                // console.log('Added SS')
                navigate('/login')
            }
            })
        
    }

    const initialValues = {
        fname:"",
        lname:"",
        gender:"",
        email:"",
        mobile:"",
        pass:""
    }

    const onSubmit = (values, onSubmitProps) => {
        // console.log('Form data', values)
        onSubmitProps.setSubmitting('false')
        onSubmitProps.resetForm()
        // dispatch(addUserDetails(values))
        addUserDetails(values)
        // navigate('/login')
    }

    const validationSchema = Yup.object({
        fname: Yup.string().required('REQUIRED'),
        lname: Yup.string().required('REQUIRED'),
        // gemder: Yup.string().required('REQUIRED'),
        email: Yup.string().email('INVALID EMAIL').required("REQUIRED"),
        mobile:Yup.string().required('REQUIRED').matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Phone number is not valid"
        ),
        pass:Yup.string().required('REQUIRED').matches(
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
                    <Avatar sx={{ bgcolor: '#2f9f80' }}></Avatar>
                    <Typography variant='h5' fontWeight={700}>SingUp / Registration</Typography>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                <Grid align='center' marginTop={5}>
                    <TextField required label='First Name' name='fname' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.fname} placeholder='Enter Your First Name' error={(formik.errors.fname && formik.touched.fname )} helperText={formik.errors.fname && formik.touched.fname ? <>{formik.errors.fname}</> : null} fullWidth />
                    <TextField required label='Last Name' name='lname' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.lname} placeholder='Enter Your Last Name' error={(formik.errors.lname && formik.touched.lname )} helperText={formik.errors.lname && formik.touched.lname ? <>{formik.errors.lname}</> : null} fullWidth />
                    <Box marginTop='10px'>
                        <FormControl required>
                            <FormLabel id='gender-group-label'>
                                Gender
                            </FormLabel>
                            <RadioGroup name='gender'  onBlur={handleBlur} onChange={handleChange} defaultValue="MALE" value={values.gender} aria-labelledby='gender-group-label'>
                                <FormControlLabel control={<Radio />} label='MALE' value='MALE' />
                                <FormControlLabel control={<Radio />} label='FEMALE' value='FEMALE' />
                                <FormControlLabel control={<Radio />} label='OTHER' value='OTHER' />
                            </RadioGroup>
                        </FormControl>
                        
                    </Box>
                    <Box>
                    {formik.errors.gender ? (<Typography variant='body1' color='red'>{formik.errors.gender}</Typography>) : null}</Box>
                    <TextField required label='Email ID' name='email' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.email} placeholder='Enter Your Email ID' error={(formik.errors.email && formik.touched.email )} helperText={formik.errors.email && formik.touched.email ? <>{formik.errors.email}</> : null} fullWidth />
                    <TextField required label='Mobile Number' name='mobile' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.mobile} placeholder='Enter Your Mobile Number' error={(formik.errors.mobile && formik.touched.mobile )} helperText={formik.errors.mobile && formik.touched.mobile ? <>{formik.errors.mobile}</> : null} fullWidth />
                    {/* <TextField label='City' variant='standard' placeholder='Enter Your City' fullWidth /> */}
                    

                    <TextField required type={showPassword ? "text" : "password" } label='Password' name='pass' variant='standard' onBlur={handleBlur} onChange={handleChange} value={values.pass} placeholder='Enter Your Password' error={(formik.errors.pass && formik.touched.pass )} helperText={formik.errors.pass && formik.touched.pass ? <>{formik.errors.pass}</> : null} fullWidth InputProps={{ // <-- This is where the toggle button is added.
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
                    <Button type='submit' color='secondary' variant='contained' fullWidth sx={{ marginTop: '20px', marginBottom: '20px' }}>SingUp / register</Button>
                    {/* <Typography><Link to='/forgot'>Forgot Password</Link></Typography>
                    <Typography><Link to='/register'>Register Now / Sing Up</Link></Typography> */}
                    <Typography><Link to='/login'>Login</Link></Typography>
                    
                </Grid>
                </form>
            </Paper>
        </Grid>
    )
}

export default Register











// import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Icon, IconButton, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
// import React from 'react'
// import LockIcon from '@mui/icons-material/Lock';
// import { Link } from 'react-router-dom';

// function Register() {
//     return (
//         <Grid sx={{ width: { xs: '60%', sm: '50%', md: '50%', lg: '40%' }, flex: { xs: '1', sm: '1', md: '4', lg: '4' }, marginBottom: '100px' }}>
//             <Paper elevation={10} sx={{ padding: '20px', marginLeft: { xs: '10%', sm: '15%', md: '5%', lg: '20%' }, marginRight: { xs: '10%', sm: '15%', md: '5%', lg: '20%' }, marginTop: '100px' }}>
//                 <Grid align='center'>
//                     <Avatar sx={{ bgcolor: '#2f9f80' }}></Avatar>
//                     <Typography variant='h5' fontWeight={700}>SingUp / Registration</Typography>
//                 </Grid>
//                 <Grid align='center' marginTop={5}>
//                     <TextField label='First Name' variant='standard' placeholder='Enter Your First Name' fullWidth />
//                     <TextField label='Last Name' variant='standard' placeholder='Enter Your Last Name' fullWidth />
//                     <Box marginTop='10px'>
//                         <FormControl>
//                             <FormLabel id='gender-group-label'>
//                                 Gender
//                             </FormLabel>
//                             <RadioGroup name='gender-group' aria-labelledby='gender-group-label'>
//                                 <FormControlLabel control={<Radio />} label='MALE' value='MALE' />
//                                 <FormControlLabel control={<Radio />} label='FEMALE' value='FEMALE' />
//                                 <FormControlLabel control={<Radio />} label='OTHER' value='OTHER' />
//                             </RadioGroup>
//                         </FormControl>
//                     </Box>
//                     <TextField label='Email ID' variant='standard' placeholder='Enter Your Email ID' fullWidth />
//                     <TextField label='Mobile Number' variant='standard' placeholder='Enter Your Mobile Number' fullWidth />
//                     {/* <TextField label='City' variant='standard' placeholder='Enter Your City' fullWidth /> */}
                    

//                     <TextField type='password' label='Password' variant='standard' placeholder='Enter Your Password' fullWidth />
//                     <Button type='submit' color='secondary' variant='contained' fullWidth sx={{ marginTop: '20px', marginBottom: '20px' }}>SingUp / register</Button>
//                     {/* <Typography><Link to='/forgot'>Forgot Password</Link></Typography>
//                     <Typography><Link to='/register'>Register Now / Sing Up</Link></Typography> */}
//                 </Grid>
//             </Paper>
//         </Grid>
//     )
// }

// export default Register