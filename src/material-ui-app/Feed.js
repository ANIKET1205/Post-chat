import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, Hidden, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { ExpandMore } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import api from "./api/api";
import { useDispatch } from 'react-redux';
import { setUser } from './redux/action/UserAction';
import { useNavigate } from 'react-router-dom';
import api2 from './api/Posts'
import { setLikePost, setupPosts } from './redux/action/PostAction';
import Add from './Add'
import { theme } from './theme';
import { setU } from './redux/action/UAction';
import fireDb from './firebase';

// import * as firebase from 'firebase/app'
// import {ref,set,get,update,remove,child} from 'firebase/database';

function Feed() {
    const u1 = useSelector(state => state.user)
    // var p = useSelector(state => state.posts)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [posts, setPosts] = useState([])
    const [info, setInfo] = useState([]);

    var f = 0

    const l = window.localStorage.getItem('materialLogin')
    const login = JSON.parse(l)


    const retrivePosts = async () => {
        // res = await api2.get('posts').then(tocken => { setPosts(tocken.data); return (tocken.data) });
        // const db = getDatabase();

        // console.log(info);

        fireDb.child('posts').on('value', (snap) => {
            if (snap.val() !== null) {
                setPosts({ ...snap.val() })
            }
            else {
                setPosts({})
            }
        })

    }

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


    useEffect(() => {
        if (!login) {
            navigate('/login')
            return
        }
        else {
            retriveData();
            retrivePosts();

            // fireDb.child('posts').on('value',(snap)=>{
            //     if(snap.val() !== null){
            //         setInfo({...snap.val()})
            //     }
            //     else{
            //         setInfo({})
            //     }
            // })

            Object.keys(data).map((id) => {
                if (data[id].email === login.email) {
                    // dispatch(setUser(data[id]))
                    window.localStorage.setItem('LoginUserId', JSON.stringify(id))
                    // navigate('/')
                }
            })
        }

        return () => {
            setPosts({})
        }

    }, [])

    useEffect(() => {
        setInfo(posts.likes)
    }, [posts])




    const handleEnabledLike = async (refid) => {
        // console.log('ID', refid)
        // const newpost = posts.filter(p => p.id === id)
        let v1;
        Object.keys(posts).map((id) => id === refid ? v1 = posts[id] : null)
        // console.log(v1)
        // v1['likes']=[...v1.likes,u1.id]
        // console.log(v1)

        let flag = 0
        v1['likes'].map((l) => l === u1.email ? flag = 1 : null)

        if (flag === 1) {
            // console.log('A')
            let a = v1['likes'].filter((l) => l !== u1.email)
            v1['likes'] = a
        }
        else {
            // console.log('B')
            v1['likes'] = [...v1.likes, u1.email]
        }


        fireDb.child(`posts/${refid}`).set(v1, (err) => {
            if (err) {
                alert(err)
            }
            else {
                // console.log('SET SS')
            }
        })



        // console.log(v1)
        // var l1 = newpost[0].likes
        // if (newpost[0].likes.length === 0) {
        //     newpost[0].likes = [u1.id]
        // }
        // else {
        //     let flag = 0
        //     newpost[0].likes.map(l => l === u1.id ? flag = 1 : null)
        //     if (flag === 0) {
        //         newpost[0].likes = [u1.id, ...l1]
        //     }
        //     else {
        //         newpost[0].likes = newpost[0].likes.filter(l => l !== u1.id)
        //     }
        // }
        // let p1 = posts
        // p1.map(p => p.id === id ? p.likes = newpost[0].likes : null)
        // // dispatch(setLikePost(newpost[0]))
        // await api2.put(`/posts/${id}`, newpost[0]).then(retrivePosts())
        // navigate('/')


        // retrivePosts();
        // setPosts(p1)


    }

    const handleUClick = (data) => {
        dispatch(setU(data))
        navigate('udetails')
    }

    // useEffect(() => {
    //     // retrivePosts()
    //     // setPosts(p)
    // }, [f])






    return (
        <Box flex={4} sx={{ paddingTop: '64px' }}>
            <Box sx={{
                maxHeight: '92vh', overflow: "hidden", overflowY: 'scroll', "&::-webkit-scrollbar": {
                    width: 7,
                    scrollMarginRight: 5
                },
                "&::-webkit-scrollbar-track": {
                    // backgroundColor: 'red'
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.secondary.light,
                    borderRadius: 2
                }
            }} p={2} >
                {
                    Object.keys(posts).slice(0).reverse().map((id) =>
                        <Card key={id} sx={{ width: { xs: "100%", sm: "100%", marginBottom: '10px', borderRadius: '25px' } }}>
                            <CardHeader
                                avatar={
                                    <IconButton onClick={() => handleUClick(posts[id].user)}>
                                        <Avatar src={posts[id].user.img} sx={{ bgcolor: '#4f3098' }} aria-label="recipe">
                                            {posts[id].user.fname[0]}
                                        </Avatar>
                                    </IconButton>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={<Typography fontWeight={600}>{posts[id].user.fname + " " + posts[id].user.lname}</Typography>}
                                subheader={posts[id].month + " " + posts[id].date + ", " + posts[id].year + "  " + posts[id].time}
                            />
                            <CardMedia
                                component="img"
                                height="20%"
                                image={posts[id].image}
                                alt="Paella dish"
                                onDoubleClick={() => handleEnabledLike(id)}
                            />
                            <CardContent>
                                <Typography fontWeight={500} variant="body2" color="text.secondary">
                                    {posts[id].desc}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <div hidden>{f = 0}</div>
                                {
                                    posts[id].likes.map(l => l === u1.email ? <div key={l} hidden>{f = 1}</div> : null)
                                }
                                <IconButton aria-label="add to favorites" sx={{ marginRight: '20px' }} onClick={() => handleEnabledLike(id)} disableRipple>
                                    {
                                        f === 1 ?
                                            // <Checkbox onChange={() => handleEnabledLike(id)} icon={<FavoriteIcon sx={{ color: 'red' }} />} checkedIcon={<FavoriteBorderIcon />} />
                                            <FavoriteIcon sx={{ color: 'red' }} />


                                            :
                                            // <Checkbox onChange={() => handleEnabledLike(id)} icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon sx={{ color: 'red' }} />} />
                                            <FavoriteBorderIcon />


                                    }
                                    <Typography fontWeight={600} variant='body1' marginLeft='10px'>{posts[id].likes.length - 1}</Typography>
                                </IconButton>
                                {/* <IconButton aria-label="add to favorites" sx={{ marginRight: '20px' }} disableRipple>
                                <Checkbox onChange={() => handleEnabledLike(post.id)} icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon sx={{ color: 'red' }} />} />
                                <Typography variant='body1'>{post.likes.length}</Typography>
                            </IconButton> */}
                                {
                                    // like === true ?
                                    //     <IconButton aria-label="add to favorites" disableRipple onClick={()=>handleEnabledLike(post.id)}>
                                    //         <FavoriteIcon sx={{ color: 'red' }} />
                                    //         {/* <Checkbox icon={<FavoriteBorderIcon   />} onChange={addLike} checkedIcon={<FavoriteIcon sx={{ color: 'red' }} />} /> */}
                                    //         {/* <Typography variant='body1'>3</Typography> */}
                                    //     </IconButton>
                                    //     : <IconButton aria-label="add to favorites" disableRipple onClick={()=>handleDisabledLike(post.id)}>
                                    //         <FavoriteBorderIcon />
                                    //         {/* <Checkbox icon={<FavoriteBorderIcon   />} onChange={addLike} checkedIcon={<FavoriteIcon sx={{ color: 'red' }} />} /> */}
                                    //         {/* <Typography variant='body1'>3</Typography> */}
                                    //     </IconButton>
                                }
                                {/* <Typography variant='body1' sx={{ marginRight: '20px' }}>{post.likes.length}</Typography> */}
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                }

                <Add />
            </Box>
        </Box>

    )
}

export default Feed