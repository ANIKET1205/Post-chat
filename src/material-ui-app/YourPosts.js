import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import api2 from './api/Posts'
import { useDispatch } from 'react-redux';
import { removePost, setLikePost } from './redux/action/PostAction';
import { id } from 'date-fns/locale';
import DeleteIcon from '@mui/icons-material/Delete';
import { theme } from './theme';
import fireDb from './firebase';

function YourPosts() {
    // var p = useSelector(state => state.posts)
    // const [p,setP] = useState([])
    const user = useSelector(state => state.user)
    const [posts, setPosts] = useState([])
    const [anchor, setAnchor] = useState(null)

    const [refid, setRefid] = useState(0)

    const dispatch = useDispatch();

    const open = Boolean(anchor)
    var f = 0

    const retrivePosts = async () => {
        // const res = await api2.get('/posts').then(tocken => { setPosts(tocken.data); return (tocken.data) });
        // console.log('RES', posts);

        fireDb.child('posts').on('value', (snap) => {
            if (snap.val() !== null) {
                setPosts({ ...snap.val() })
            }
            else {
                setPosts({})
            }
        })

    }


    useEffect(() => {
        retrivePosts();
        // let newvar = posts.filter((post) => post.user.id === user.id)
        // setPosts(newvar)
    }, [])


    // const [open1, setOpen] = React.useState(false);

    const handleEnabledLike = async (refid) => {
        // console.log('ID', refid)
        // const newpost = posts.filter(p => p.id === id)
        let v1;
        Object.keys(posts).map((id) => id === refid ? v1 = posts[id] : null)
        // console.log(v1)
        // v1['likes']=[...v1.likes,u1.id]
        // console.log(v1)

        let flag = 0
        v1['likes'].map((l) => l === user.email ? flag = 1 : null)

        if (flag === 1) {
            // console.log('A')
            let a = v1['likes'].filter((l) => l !== user.email)
            v1['likes'] = a
        }
        else {
            // console.log('B')
            v1['likes'] = [...v1.likes, user.email]
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

    const handleMenuClick = (id) => {
        // setAnchor(event.currentTarget)
        // setRefid(event.id)
        // console.log(refid)
        // console.log(id)
        let de = window.confirm("Are you sure to remove this Post?");
        // console.log(isExecuted);
        if (de) {
            fireDb.child(`posts/${id}`).remove((err) => {
                if (err) {
                    // console.log(err)
                }
                else {
                    // console.log('SUCCESS DELETE')
                }
            })
        }


    }

    // const handleMenuClose = (refid) => {
    //     // setOpen(true)
    //     // setRefid(id)
    //     // console.log(refid)
    //     // let a = posts.filter()
    //     api.delete(`/posts/${refid}`)
    //     dispatch(removePost(refid))
    //     let a = posts.filter(post => post.id !== refid)
    //     setPosts(a)

    //     setAnchor(null)
    // }





    // setPosts(p)
    // console.log("POSTS", posts)
    return (
        <Box flex={4} sx={{ paddingTop: '72px' }} >
            <Box sx={{
                maxHeight: '91vh', overflow: "hidden", overflowY: 'scroll', "&::-webkit-scrollbar": {
                    width: 7,
                    scrollMarginRight: 5
                },
                "&::-webkit-scrollbar-track": {
                    // backgroundColor: 'red'
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.secondary.light,
                    borderRadius: 2
                },
                paddingX: '8px'
            }} >
                <Typography variant='h5' fontWeight={500} align='center' sx={{ marginBottom: "30px", border: "2px solid black", borderRadius: '20px', color: 'white', bgcolor: theme.palette.primary.light, boxShadow: '0px 0px 5px black' }}>YOUR POSTS</Typography>
                {
                    Object.keys(posts).map((id, index) =>
                        posts[id].user.email === user.email && posts[id].user.pass === user.pass ?
                            <Card key={index} sx={{ width: { xs: "100%", sm: "100%", marginBottom: '10px', borderRadius: '25px' } }}>
                                <CardHeader
                                    avatar={
                                        <Avatar src={user.img} sx={{ bgcolor: '#4f3098' }} aria-label="recipe">
                                            {posts[id].user.fname[0]}
                                        </Avatar>
                                    }
                                    action={
                                        <>
                                            <IconButton sx={{ color: 'white', bgcolor: 'red' }} aria-label="settings" onClick={() => handleMenuClick(id)} /*aria-control={open ? 'resources-menu' : undefined}*/ aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
                                                <DeleteIcon />
                                            </IconButton>
                                            {/* <Menu id='resources-menu' anchorEl={anchor} open={open} MenuListProps={{ 'aria-labelledby': 'resources-button' }} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                        <MenuItem onClick={() => handleMenuClose()}>Delete Post</MenuItem>

                                    </Menu> */}
                                            {/* <Dialog open={open1} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Use Google's location service?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are You Sure? Do You want to Remove this post?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => handleClose()}>Yes</Button>
                                            <Button onClick={() => setOpen(false)} autoFocus>
                                                No
                                            </Button>
                                        </DialogActions>
                                    </Dialog> */}
                                        </>
                                    }
                                    title={posts[id].user.fname}
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
                                    <Typography variant="body2" color="text.secondary">
                                        {posts[id].desc}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                <div hidden>{f = 0}</div>
                                {
                                    posts[id].likes.map(l => l === user.email ? <div key={l} hidden>{f = 1}</div> : null)
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
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </CardActions>
                            </Card> : null
                    )
                }
            </Box>
        </Box>
    )
}

export default YourPosts