import { Avatar, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/action/UserAction';
import api from './api/api';
import { theme } from './theme';
import fireDb from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bar() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data,setData] = useState({})

    var uId = window.localStorage.getItem('LoginUserId')

    // const retriveData = async () => {
    //     // const res = await api.get('/users2').then(tocken => { setData(tocken.data); return (tocken.data) });


    //     fireDb.child('users').on('value', (snap) => {
    //         if (snap.val() !== null) {
    //             setData({ ...snap.val() })
    //         }
    //         else {
    //             setData({})
    //         }
    //     })
    //     // console.log('RES',res);
    // }



    // useEffect(()=>{
    //     // console.log('user',user) 
    //     retriveData();

    //     return () => {
    //         setData({})
    //     }
    // },[])

    // useEffect(()=>{
    //     Object.keys(data).map((id)=>
    //         data[id].email === user.email && data[id].pass === user.pass ? uId=id : null
    //     )

    //     console.log('UID',uId)
    // },[data,user])








    const handleLogout =async () => {
        window.localStorage.removeItem('materialLogin')
        window.localStorage.removeItem('LoginUserId')
        
        // console.log(uId)
        // user.login=false
        // api.put(`/users2/${user.id}`, { 'login': false }).then()
        await fireDb.child(`users/${JSON.parse(uId)}`).set({...user,'login':false}, (err) => {
            if (err) {
                alert(err)
            }
            else {
                // console.log('Logout')
                const initialState = {
                    fname: "",
                    lname: "",
                    gender: "",
                    email: "",
                    mobile: "",
                    pass: "",
                    login: false
                }
                dispatch(setUser(initialState))
                navigate('/')
                window.location.reload();
            }
        })

        
        // window.localStorage.removeItem('login')


        
        // navigate('/')
    }

    const handleHomeClick = () => {
        // props.setIsDrawerOpen(false)
        if (user.email === '') {
            // alert("Please Login Your Self first.")
            toast.warn('Please Login Your Self first', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        navigate('/')
    }

    const handleLoginClick = () => {
        navigate('login')
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }

    const handleProfileClick = () => {
        navigate('/profile')
    }

    const handleUserPostClick = () => {
        navigate('/userPosts')
    }


    return (
        <Box sx={{ width: '100%', borderRadius: '10px', color: 'white' }}>
            <Stack direction='row' sx={{ paddingBottom: "10px" }} display='flex' justifyContent="center">
                {/* <IconButton color=""> */}
                    <Avatar src={user.img} sx={{bgcolor:'sky',color:'black'}}></Avatar>
                {/* </IconButton> */}
                <Typography variant='h6' sx={{ paddingLeft: "10px", paddingRight: "10px", alignSelf: 'center', width: '100%' }}>{user.fname === "" ? <>GUEST</> : user.fname}</Typography>
            </Stack>
            <Box>
                <List>
                <ListItem disablePadding>
                        {/* <Link to='/'> */}
                        <ListItemButton onClick={handleHomeClick}>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                        {/* </Link> */}
                    </ListItem>
                    {
                        user.email === '' ? <>
                            <ListItem disablePadding >
                                {/* <Link to='/login'> */}
                                <ListItemButton onClick={handleLoginClick}>
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                                {/* </Link> */}
                            </ListItem>
                            <ListItem disablePadding>
                                {/* <Link to='/register'> */}
                                <ListItemButton onClick={handleRegisterClick}>
                                    <ListItemText primary="Registration" />
                                </ListItemButton>
                                {/* </Link> */}
                            </ListItem>
                        </> : <>
                            <ListItem disablePadding>
                                <ListItemButton width="100%" onClick={handleProfileClick}>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton width="100%" onClick={handleUserPostClick}>
                                    <ListItemText primary="Your Posts" />
                                </ListItemButton>
                            </ListItem>
                            {/* <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Setting" />
                                </ListItemButton>
                            </ListItem> */}
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    }

                   

                    {/* <ListItem disablePadding>
                        <ListItemButton href=''>
                            <ListItemText primary="About Us" />
                        </ListItemButton>
                    </ListItem> */}

                    {/* <ListItem disablePadding>
                    <ListItemButton component='a' href=''>
                        <ListItemIcon>
                            <DarkModeIcon />
                        </ListItemIcon>
                        <Switch color="secondary" ></Switch>
                    </ListItemButton>
                </ListItem> */}

                </List>
                <ToastContainer />
            </Box>
            
        </Box>
    )
}

export default Bar