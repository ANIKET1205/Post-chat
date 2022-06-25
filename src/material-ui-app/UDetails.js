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

function UDetails() {
    const u = useSelector(state => state.u)
    const [user,setUser1] = useState(u)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [flag,setFlag] = useState(0)

    useEffect(()=>{
        // console.log('user',user)
    },[])
    
    const handleEditClick = ()=>{
        setFlag(1)
    }

    const handleChPassClick =()=>{
        navigate('/changePass')
    }

    return (
        <Box flex={4} sx={{ paddingTop: '100px' }} p={2}>
            {/* <Typography variant='h4' align='center' fontWeight='500'>User Profile</Typography> */}
            <Stack direction='row' sx={{ paddingBottom: "10px", paddingTop: '30px' }} justifyContent="center">
                <Avatar>{user.fname[0]}</Avatar>
                <Typography variant='h5' sx={{ paddingLeft: "10px", paddingRight: "10px", alignSelf: 'center',letterSpacing:'2px' }} align='center'>{user.fname === "" ? <>GUEST</> : user.fname}</Typography>
            </Stack>
            <Stack>
                <Typography variant=''></Typography>
            </Stack>
            <Paper elevation={10} sx={{ padding: '20px', marginLeft: { xs: '2%', sm: '10%', md: '5%', lg: '20%' }, marginRight: { xs: '2%', sm: '10%', md: '5%', lg: '20%' }, marginTop: '30px' }}>
                    <Grid align='center'>
                        <Typography variant='body1' sx={{letterSpacing:'2px',margin:'5px'}}>
                            Name : {user.fname+" "+user.lname}
                        </Typography>
                        <Typography variant='body1' sx={{letterSpacing:'2px',margin:'5px'}}>
                            Email ID : {user.email}
                        </Typography>
                        <Typography variant='body1' sx={{letterSpacing:'2px',margin:'5px'}}>
                            Gender : {user.gender}
                        </Typography>
                        <Typography variant='body1' sx={{letterSpacing:'2px',margin:'5px'}}>
                            Mobile Number : {user.mobile}
                        </Typography>
                    </Grid>
            </Paper>
        </Box>
    )
}

export default UDetails