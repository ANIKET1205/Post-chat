import { Avatar, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Switch, Typography } from '@mui/material'
import React from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/action/UserAction';
import Bar from './Bar';
import { theme } from './theme';

function SideBar() {
    // const user = useSelector(state => state.user)
    // const dispatch = useDispatch();

    // const handleLogout = () => {
    //     window.localStorage.removeItem('materialLogin')
    //     const initialState = {
    //         id: "",
    //         fname: "",
    //         lname: "",
    //         gender: "",
    //         email: "",
    //         mobile: "",
    //         pass: "",
    //         login: false
    //     }
    //     dispatch(setUser(initialState))
    // }
    // console.log('AA',user)
    return (
        <Box color='white' flex={1} p={2} position='sticky' sx={{ display: { xs: "none", sm: "none", md: "block" }, paddingTop: '100px',textShadow:"0px 0px 5px black",minHeight:'100vh',bgcolor:theme.palette.primary.light }}>
            <Box position='fixed' width='15%' >
                {/* <Stack direction='row' sx={{ paddingBottom: "10px" }} justifyContent="center">
                    <Avatar />
                    <Typography variant='h6' sx={{ paddingLeft: "10px", paddingRight: "10px", alignSelf: 'center' }} align='center'>{user.fname === "" ? <>GUEST</> : user.fname}</Typography>
                </Stack>
                <List>
                    {
                        user.email === '' ? <>
                            <ListItem disablePadding>
                                <Link to='/login'>
                                    <ListItemButton href=''>
                                        <ListItemText primary="Login" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                <Link to='/register'>
                                    <ListItemButton href=''>
                                        <ListItemText primary="Registration" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </> : <>
                            <ListItem disablePadding>
                                <ListItemButton width="100%" component='a' href=''>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component='a' href=''>
                                    <ListItemText primary="Setting" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component='a' onClick={handleLogout}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    }

                    <ListItem disablePadding>
                        <Link to='/feed'>
                            <ListItemButton href=''>

                                <ListItemText primary="Home" />

                            </ListItemButton>
                        </Link>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component='a' href=''>
                            <ListItemText primary="About Us" />
                        </ListItemButton>
                    </ListItem>


                </List> */}
                <Bar />
            </Box>
        </Box>
    )
}

export default SideBar