// import { Feed } from '@mui/icons-material'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, Divider, Stack } from '@mui/material'
import { Box, createTheme } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Add from './Add'
import ChangePass from './ChangePass'
import Chat from './Chat'
import Feed from './Feed'
import ForgotPass from './ForgotPass'
import Login from './Login'
import NavBar from './NavBar'
import OnlineFriends from './OnlineFriends'
import Profile from './Profile'
import store from './redux/Store'
import Register from './Register'
import RightBar from './RightBar'
import SideBar from './SideBar'
import { theme } from './theme'
import YourPosts from './YourPosts'
import UDetails from './UDetails'
// import { io } from "socket.io-client";

function Main() {

    // const [socket,setSocket]=useState(null)

    // useEffect(()=>{
    //     setSocket(io("http://localhost:4000"));
        
    // },[])

    // useEffect(()=>{
    //     socket.emit("newUser",socket.id)
    // },[socket])

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Box>
                    <CssBaseline />
                    <BrowserRouter>
                        <NavBar />
                        <Stack direction='row' justifyContent="space-between">
                            <SideBar />
                            {/* <Divider orientation="vertical" /> */}
                            <Routes>
                                <Route path='/' element={<Feed />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/forgot' element={<ForgotPass />} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/changePass' element={<ChangePass />} />
                                <Route path='/userPosts' element={<YourPosts />} />
                                <Route path='/onlineFriends' element={<OnlineFriends />} />
                                <Route path='/chat' element={<Chat />} />
                                <Route path='/addPost' element={<Add />} />
                                <Route path='/udetails' element={<UDetails />} />

                                {/* <Feed /> */}
                            </Routes>

                            {/* <Divider orientation="vertical" /> */}
                            <RightBar />
                            {/* <Add /> */}
                        </Stack>
                    </BrowserRouter>
                </Box>
            </Provider>
        </ThemeProvider>

    )
}

export default Main