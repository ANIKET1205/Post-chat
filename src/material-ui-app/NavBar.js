import { AppBar, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, Grid, IconButton, Stack, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import Bar from './Bar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setupPosts } from './redux/action/PostAction';
import { setUser } from './redux/action/UserAction';
import { useEffect } from 'react';
import api from "./api/api";
import api2 from "./api/Posts";
import { theme } from './theme';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import fireDb from './firebase';


function NavBar() {
    // const [login, setLogin] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)



    // const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log('U',user)
    const [data, setData] = useState({})
    const [posts, setPosts] = useState([])
    const l = window.localStorage.getItem('materialLogin')
    const login = JSON.parse(l)
    const retriveData = async () => {
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
    // const retrivePosts = async () => {
    //     const res = await api2.get('/posts').then(tocken => { setPosts(tocken.data); return (tocken.data) });

    //     // console.log('RES', posts);
    // }

    // useEffect(() => {
    //     dispatch(setupPosts(posts))
    // }, [posts])


    useEffect(() => {
        setIsDrawerOpen(false)
    }, [window.location.pathname])


    useEffect(() => {

        // console.log('GG', login)
        retriveData();

        return () => {
            setData({})
        }
        // retrivePosts();


        // console.log("AAAAA",posts)
    }, [])
    useEffect(() => {
        if (login) {
            Object.keys(data).map((id) => {
                if (data[id].email === login.email) {
                    dispatch(setUser(data[id]))
                    // window.localStorage.setItem('LoginUserId', JSON.stringify(id))
                    // navigate('/')
                }
            })
        }

    }, [data])





    return (
        <Stack >
            <Box >
                <AppBar position='fixed' color='primary' width='100%'>
                    <Toolbar>

                        {/* <Stack direction='row'> */}
                        <IconButton size='large' color='inherit' edge='start' aria-label='logo'>
                            <AcUnitIcon />
                        </IconButton>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1, fontSize: { xs: '17px', sm: '17px', md: '20px' } }}>
                            MY MATERIAL APP
                        </Typography>
                        {/* </Stack> */}
                        {/* <Stack spacing={2} direction='row' sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                        <Button color="inherit">LOGIN</Button>
                        <Button color="inherit">Registration</Button>
                        <Button color="inherit">About US</Button>
                        <Button color="inherit">Setting</Button>
                    </Stack> */}
                        {/* <Stack>
                            <IconButton color='inherit'>
                                <NotificationsIcon />
                            </IconButton>
                        </Stack> */}
                        <Stack>
                            <IconButton color='inherit' onClick={() => navigate('/')}>
                                <HomeIcon />
                            </IconButton>
                        </Stack>
                        <Stack sx={{ display: { xs: 'grid', sm: 'grid', md: 'none' } }}>

                            <IconButton color='inherit' onClick={() => setIsDrawerOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                                <Box p={2} width="200px" textAlign='center' role='presentation' sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
                                    {/* <Typography variant='h6' component='div'>
                                        <Stack direction='row' sx={{ paddingBottom: "10px" }} justifyContent="center">
                                            <Avatar />
                                            <Typography variant='h6' sx={{ paddingLeft: "10px", paddingRight: "10px", alignSelf: 'center' }} align='center'>Guest</Typography>
                                        </Stack>
                                        <Stack>
                                            <Link to='/login' onClick={()=>setIsDrawerOpen(false)}><Button color="inherit">LOGIN</Button></Link>
                                            <Link to='/register' onClick={()=>setIsDrawerOpen(false)}><Button color="inherit">Registration</Button></Link>
                                            <Button color="inherit">Profile</Button>
                                            <Button color="inherit">About US</Button>
                                            <Button color="inherit">Setting</Button>
                                            <Button color="inherit">Logout</Button>
                                            <Button color="inherit" onClick={() => setIsDrawerOpen(false)}>CLOSE MENU</Button>
                                        </Stack>
                                    </Typography> */}
                                    <Bar />
                                    <Button color="inherit" onClick={() => setIsDrawerOpen(false)}>CLOSE MENU</Button>
                                    <Button color="inherit" onClick={() => navigate('/onlineFriends')}>Online Friends</Button>
                                </Box>
                            </Drawer>
                        </Stack>
                    </Toolbar>
                </AppBar>

                {/* <Box>
                    <Dialog sx={{ marginLeft: '40%', bgcolor: 'transparent'}} aria-label="dialog-title" aria-describedby="dialog-description" open={login} onClose={() => setLogin(false)}>
                        <DialogTitle id='dialog-title' display='flex' justifyContent='center'>LOGIN</DialogTitle>
                        <DialogContent >
                            <DialogContentText id='dialog-description'>
                                <TextField variant='filled' sx={{margin:'50px',marginBottom:'0px'}} label="User Id" /><br />
                                <TextField variant='filled' sx={{margin:'50px',marginTop:'10px'}} label="Password" />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setLogin(false)} autoFocus>Cancle</Button>
                            <Button onClick={() => setLogin(false)} autoFocus>Login</Button>
                        </DialogActions>
                    </Dialog>
                </Box> */}
            </Box>
        </Stack>
    )
}

export default NavBar