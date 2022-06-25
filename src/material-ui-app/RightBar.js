import { useSelect } from '@mui/base';
import { Fullscreen } from '@mui/icons-material';
import { Avatar, Badge, Box, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Typography } from '@mui/material'
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

function RightBar() {
  const u = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const [luser, setLuser] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

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
    retriveData();
    // console.log(data)
    return () => {
      setData({})
    }

  }, [])

  const handleClick = (friend) => {
    dispatch(setFriend(friend))
    // console.log(friend)
    navigate('/chat')
  }


  // const onInputChange = (e) => {
  //   setSearchTerm(e.target.value);

  //   if (searchTerm === null) {
  //     retriveData();
  //   }
  //   else {
  //     const d1 = Object.keys(data).map((id) => {
  //       console.log(data[id])
  //       if (data[id].fname === searchTerm || data[id].lname === searchTerm) {
  //         // console.log()
  //         return data[id];
  //       }
  //     })
  //     console.log(d1)
  //     var filtered = d1.filter(function (x) {
  //       return x !== undefined;
  //     });
  //     setData(filtered)
  //   }
  // }
  

  // const FilterData=()=>{
  //   const nBooks = Book.map((i)=>{
  //   console.log(i.name)
  //   if(i.name === searchTerm){
  //   return i;
  //   }
  //   })
  // var filtered = nBooks.filter(function(x) {
  // return x !== undefined;
  // });






  // useEffect(() => {
  //   // const newData = data.filter((d) => d.login === true)
  //   // setLuser(data)
  //   // console.log(luser)
  // }, [data])
  return (
    <Box color='white' flex={1} p={3} sx={{ display: { xs: "none", sm: "none", md: "block" }, paddingTop: '100px', textShadow: "0px 0px 3px black", minHeight: '100vh', bgcolor: theme.palette.primary.light }}>
      <Box position='fixed' width='15%' >
        <Typography variant='h6' fontWeight={100}>Online Friends</Typography>
        <Box bgcolor='3f9fa0' sx={{ width: '100%' }}>
          {/* <TextField size='small' sx={{ marginX: '10px' }} placeholder='Search User' value={searchTerm} onChange={onInputChange} name="mess" autoComplete='off' /> */}
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
                                  <Avatar src={data[id].img} sx={{ bgcolor: 'white', color: theme.palette.primary.dark }}></Avatar>
                                </Badge> : <Avatar src={data[id].img} sx={{ bgcolor: 'white', color: theme.palette.primary.dark }}>{data[id].fname[0]}</Avatar>
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

export default RightBar