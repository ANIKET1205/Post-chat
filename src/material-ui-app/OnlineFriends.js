import { useSelect } from '@mui/base';
import { Fullscreen } from '@mui/icons-material';
import { Avatar, Badge, Box, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from "./api/api";
import { setFriend } from './redux/action/FriendAction';
import { theme } from './theme';
import fireDb from './firebase';

function OnlineFriends() {
  const u = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  // const [luser, setLuser] = useState([])

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

  const handleClick = (friend) => {
    dispatch(setFriend(friend))
    // console.log(friend)
    navigate('/chat')
  }

  useEffect(() => {
    retriveData();
    // console.log(data)

    return () => {
      setData({})
    }
  }, [])

  // useEffect(() => {
  //   // const newData = data.filter((d) => d.login === true)
  //   setLuser(data)
  //   // console.log(luser)
  // }, [data])
  return (
    <Box color='black' flex={1} p={3} sx={{  paddingTop: '100px',textShadow:"0px 0px 1px black",minHeight:'100vh' }}>
      <Box position='fixed' width='100%' >
        <Typography variant='h6' fontWeight={100} align='center'>Online Friends</Typography>
        <Box bgcolor='3f9fa0' sx={{ width: '90%' }}>
          {u.fname !== '' ?
            <List>
              {
                Object.keys(data).map((id, index) =>
                  data[id].email !== u.email ?
                    <ListItem key={index} disablePadding  >
                      <ListItemButton sx={{ width: '100%' }} onClick={() => handleClick(data[id])}>
                        <ListItemText>
                          <Stack direction='row'>
                            <IconButton >
                              {
                                data[id].login === true ? <Badge variant="dot" color="blue" showZero>
                                  <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.dark, boxShadow:'0px 0px 3px black' }}>{data[id].fname[0]}</Avatar>
                                </Badge> : <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.dark, boxShadow:'0px 0px 3px black' }}>{data[id].fname[0]}</Avatar>
                              }

                            </IconButton>
                            <Typography alignSelf='center' variant='h6'>{data[id].fname}</Typography>
                          </Stack>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    : null
                )
              }
            </List> : null
          }

        </Box>
      </Box>

    </Box>
  )
}

export default OnlineFriends