import { Avatar, Box, IconButton, Stack, TextField, Typography, Dialog, DialogActions, DialogContent, Button, Grid } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { TextFieldsRounded } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { theme } from './theme';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { db } from './firebaseConfig/firebase';
import api from './api/Posts'
import '../App.css';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import fireDb from './firebase';
// import mybg from '../../public/mybg.png'

function Chat() {
    // window.onbeforeunload =alert("Dude, are you sure you want to leave? Think of the kittens!");
    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend)
    const [message, setMessage] = useState({})
    const [message1, setMessage1] = useState([])
    const [imageField, setImageField] = useState("");
    const [open, setOpen] = useState(false);


    const cam = useRef(null)
    const [hasPhoto, setHasPhoto] = useState(false);


    // chatHistory.scrollTop = chatHistory.scrollHeight;
    // const setscroll = () => {
    // var sc = document.getElementById('scrollChat')
    // sc.scrollTop = sc.scrollHeight
    // }

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
        setImageField("")
    };


    const handleFile = (e) => {
        let files = e.target.files;
        // console.log(files)
        // file reader object to read file as data url
        let reader = new FileReader();
        // reading file as data url
        reader.readAsDataURL(files[0]);
        // this will give base64 image
        // console.log(e.target.files[0]);

        const formData = new FormData();
        formData.append("image", e.target.files[0], e.target.files[0].name)
        formData.append('name', 'Demo')
        // console.log('FORMDATA', formData)
        // api.post('/products',formData)

        reader.onload = (e) => {
            // console.log(e.target.result);
            //   imageField = e.target.result
            setImageField(e.target.result)
            //   formik.setFieldValue("image",e.target.result)
            setOpen(true)
        };
    };

    const handleDeleteClick = (id) => {
        console.log(id)
        let de = window.confirm("Are you sure to remove this Message?");
        // console.log(isExecuted);
        if (de) {
            // api.delete(`/messages/${m.id}`)
            // dispatch(removePost(m.id))
            // let a = message.filter(me => me.id !== m.id)
            // setMessage(a)
            fireDb.child(`messages/${id}`).remove((err)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log('SUCCESS DELETE')
                }
            })
        }
    }



    const fetchMessages = async () => {
        // const res = await api.get('/messages').then(tocken => { setMessage(tocken.data); return (tocken.data) })
        // console.log(message);


        fireDb.child('messages').on('value', (snap) => {
            if (snap.val() !== null) {
                setMessage({ ...snap.val() })
            }
            else {
                setMessage({})
            }
        })
    }


    useEffect(() => {
        fetchMessages();
        // var sc = document.getElementById('scrollChat')
        // // sc.scrollTop = sc.scrollHeight
        // sc.scrollIntoView({block: "end"})
        // window.scrollTo(0, document.body.scrollHeight);
        return () => {
            setMessage({})
        }
    }, [])


    useEffect(() => {
        // console.log(message)
        // const a = message.filter((m) => (m.sender === user.email && m.reciever === friend.email) || (m.reciever === user.email && m.sender === friend.email))
        // setMessage1(a)

        // const a = Object.keys(message).filter((id)=> (message[id].sender === user.email && message[id].reciever === friend.email) || (message[id].reciever === user.email && message[id].sender === friend.email))
        // setMessage1(a)

        // let a = [];
        // Object.keys(message).map((id, index) => {
        //     <div key={index}>{
        //         (message[id].sender === user.email && message[id].reciever === friend.email) || (message[id].reciever === user.email && message[id].sender === friend.email) ?
        //             a = [...a, message[id]] : null
        //     }
        //     </div>
        // })
        // setMessage1(a)









        // sc.scrollIntoView({block: "end"})

        // var sc = document.getElementById('scrollChat')
        // // sc.scrollTop = sc.scrollHeight
        // sc.scrollIntoView({block: "end"})
    }, [message, friend])

    useEffect(() => {
        var sc = document.getElementById('scrollChat')
        sc.scrollTop = sc.scrollHeight
    }, [message,friend])

    const [initialValues, setInitialValues] = useState({ mess: "" })

    const onSubmit = (values, onSubmitProps) => {

        // if (values.mess === '') {
        //     alert('Please Write Something');
        //     return;
        // }
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const d = new Date();
        let m = monthNames[d.getMonth()];
        let time = d.getHours() + ' : ' + d.getMinutes()
        let Id
        // message.length === 0 ? Id = 1 : Id = message[message.length - 1].id + 1

        const newValue = { ...values, "img": imageField, "sender": user.email, "reciever": friend.email, 'date': d.getDate(), 'month': m, 'year': d.getFullYear(), "time": time }
        // console.log('Form data', newValue)

        // api.post('/messages', newValue).then(console.log("SUCCESS"))




        fireDb.child('messages').push(newValue, (err) => {
            if (err) {
                alert(err)
            }
            else {
                // console.log('Added SS')
            }
        })



        // setMessage([...message, newValue])
        fetchMessages()


        // window.location.reload()





        onSubmitProps.setSubmitting('false')
        onSubmitProps.resetForm()
        setImageField("")
        setOpen(false)
        // var sc = document.getElementById('scrollChat')
        // sc.scrollTop = sc.scrollHeight
        // sc.scrollIntoView({block: "end"})
    }

    const validationSchema = Yup.object({
        // mess: Yup.string().required()
    })


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    const { handleBlur, handleChange, values } = formik

    const handleCamClick = () => {
        const v = cam.current.click()
        // console.log(v)
    }




    return (
        <Box flex={4} sx={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }} >
            <Stack direction="column" sx={{ height: '88%', marginBottom: '100px', border: '2px solid black', position: 'fixed', width: { xs: '93%', sm: '95.5%', md: '59%', ld: '60.5%' }, borderRadius: '15px', bgcolor: theme.palette.info.main,boxShadow:'0px 0px 5px black' }}>
                {/* <Box sx={{border:'2px solid black',position:'sticky fixed',width:'100%'}}> */}
                <Stack direction='row' sx={{ bgcolor: theme.palette.secondary.main, padding: '5px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', width: '100%', borderBottom: '5px solid black' }}>
                    <IconButton onClick={() => window.history.back()}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Avatar src={friend.img}>{friend.fname[0]}</Avatar>
                    <Typography alignSelf='center' sx={{ marginLeft: '10px' }} variant='h6'>{friend.fname + ' ' + friend.lname}</Typography>
                </Stack>
                {/* <Box sx={{height:'89%',marginBottom:'100px',border:'2px solid black',position:'fixed',width:{xs:'93%',sm:'95.5%',md:'59%',ld:'60.5%'},borderRadius:'15px'}}></Box> */}
                <Stack id='scrollChat' direction='column' sx={{
                    overflow: "hidden", overflowY: 'scroll', "&::-webkit-scrollbar": {
                        width: 3,
                        marginRight: 2
                    },
                    "&::-webkit-scrollbar-track": {
                        // backgroundColor: theme.palette.primary.main
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: '#e0e0e0',
                        borderRadius: 2,
                    }
                }}>
                    {
                        // console.log('MEMEME', message1)
                    }
                    {
                        Object.keys(message).map((id,index) => (message[id].sender === user.email && message[id].reciever === friend.email) || (message[id].reciever === user.email && message[id].sender === friend.email)
                            ? 
                                    message[id].sender === user.email ?
                                        <Box key={index} display="flex" justifyContent='right' >
                                            <Box align='center' arrow sx={{ bgcolor: '#e0e0e0', width: 'auto', paddingLeft: '10px', paddingRight: '10px', paddingY: '3px', margin: '10px', borderRadius: '5px' }}>
                                                <Box display='' justifyContent='around' >
                                                    <Stack direction='row' width='100%' display='flex' justifyContent='space-between'>
                                                        <Typography variant='body2' alignSelf='center' sx={{ fontSize: '13px' }} >
                                                            {
                                                                user.fname
                                                            }
                                                        </Typography>
                                                        <IconButton size='small' align='right' color='error' onClick={() => handleDeleteClick(id)}>
                                                            <DeleteIcon size='small' sx={{ height: '15px' }} />
                                                        </IconButton>
                                                    </Stack>
                                                    {/* <Typography variant='body2' > */}
                                                    <pre style={{ margin: 1, fontSize: '13px' }}>
                                                        {
                                                            message[id].date + ' ' + message[id].month + ' ' + message[id].year + '   ' + message[id].time
                                                        }
                                                    </pre>
                                                    {/* </Typography> */}
                                                </Box>
                                                <Box bgcolor='#f0f0f0' sx={{ paddingX: '3px', borderRadius: '5px' }}>
                                                    {
                                                        message[id].img !== "" ?
                                                            <Box sx={{ maxHeight: '19vh', maxWidth: '19vh' }}>
                                                                <img
                                                                    style={{ minWidth: '15vh', minHeight: "15vh", maxHeight: '18vh', maxWidth: '18vh' }}
                                                                    src={message[id].img}
                                                                    alt="image"
                                                                />
                                                            </Box> :
                                                            null
                                                    }
                                                    {/* <Grid item xs={4}> */}
                                                    <Typography xs={4} variant='body2' sx={{ width: 'auto', maxWidth: { xs: '150px', sm: '180px', md: '250px', ld: '250px' }, height: 'auto', overflow: 'auto' }}>
                                                        {
                                                            message[id].mess
                                                        }
                                                    </Typography>
                                                    {/* </Grid> */}
                                                </Box>
                                            </Box>
                                        </Box> : <Box key={id} display="flex" justifyContent='left' >
                                            <Box align='center' sx={{ bgcolor: '#c0c0c0', width: 'auto', paddingLeft: '10px', paddingRight: '10px', paddingY: '3px', margin: '10px', borderRadius: '5px' }}>
                                                <Box display='' justifyContent='around'>
                                                    <Stack direction='row' width='100%' display='flex' justifyContent='space-between'>
                                                        <Typography variant='body2' alignSelf='center' sx={{ fontSize: '13px' }} >
                                                            {
                                                                friend.fname
                                                            }
                                                        </Typography>
                                                        {/* <IconButton size='small' align='right' color='error' onClick={()=>handleDeleteClick(m)}>
                    <DeleteIcon size='small' sx={{height:'15px'}} />
                </IconButton> */}
                                                    </Stack>
                                                    {/* <Typography variant='body2' > */}
                                                    <pre style={{ margin: 1, fontSize: '13px' }}>
                                                        {
                                                            message[id].date + ' ' + message[id].month + ' ' + message[id].year + '   ' + message[id].time
                                                        }
                                                    </pre>
                                                    {/* </Typography> */}
                                                </Box>
                                                <Box bgcolor='#f0f0f0' sx={{ paddingX: '3px', borderRadius: '5px' }}>
                                                    {
                                                        message[id].img !== "" ?
                                                            <Box sx={{ maxHeight: '19vh', maxWidth: '19vh' }}>
                                                                <img
                                                                    style={{ minWidth: '15vh', minHeight: "15vh", maxHeight: '18vh', maxWidth: '18vh' }}
                                                                    src={message[id].img}
                                                                    alt="image"
                                                                />
                                                            </Box> :
                                                            null
                                                    }
                                                    <Typography xs={4} variant='body2' sx={{ width: 'auto', maxWidth: { xs: '150px', sm: '180px', md: '250px', ld: '250px' }, height: 'auto', overflow: 'auto' }}>
                                                        {
                                                            message[id].mess
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Box>

                                        </Box>
                                
                         : null
                        )
                        // message1.map((m) => m.sender === user.email ?
                        //     <Box key={m.id} display="flex" justifyContent='right' >
                        //         <Box align='center' arrow sx={{ bgcolor: '#e0e0e0', width: 'auto', paddingLeft: '10px', paddingRight: '10px', paddingY: '3px', margin: '10px', borderRadius: '5px' }}>
                        //             <Box display='' justifyContent='around' >
                        //                 <Stack direction='row' width='100%' display='flex' justifyContent='space-between'>
                        //                     <Typography variant='body2' alignSelf='center' sx={{ fontSize: '13px' }} >
                        //                         {
                        //                             user.fname
                        //                         }
                        //                     </Typography>
                        //                     <IconButton size='small' align='right' color='error' onClick={() => handleDeleteClick(m)}>
                        //                         <DeleteIcon size='small' sx={{ height: '15px' }} />
                        //                     </IconButton>
                        //                 </Stack>
                        //                 {/* <Typography variant='body2' > */}
                        //                 <pre style={{ margin: 1, fontSize: '13px' }}>
                        //                     {
                        //                         m.date + ' ' + m.month + ' ' + m.year + '   ' + m.time
                        //                     }
                        //                 </pre>
                        //                 {/* </Typography> */}
                        //             </Box>
                        //             <Box bgcolor='#f0f0f0' sx={{ paddingX: '3px', borderRadius: '5px' }}>
                        //                 {
                        //                     m.img !== "" ?
                        //                         <Box sx={{ maxHeight: '19vh', maxWidth: '19vh' }}>
                        //                             <img
                        //                                 style={{ minWidth: '15vh', minHeight: "15vh", maxHeight: '18vh', maxWidth: '18vh' }}
                        //                                 src={m.img}
                        //                                 alt="image"
                        //                             />
                        //                         </Box> :
                        //                         null
                        //                 }
                        //                 {/* <Grid item xs={4}> */}
                        //                 <Typography xs={4} variant='body2' sx={{ width: 'auto', maxWidth: { xs: '150px', sm: '180px', md: '250px', ld: '250px' }, height: 'auto', overflow: 'auto' }}>
                        //                     {
                        //                         m.mess
                        //                     }
                        //                 </Typography>
                        //                 {/* </Grid> */}
                        //             </Box>
                        //         </Box>
                        //     </Box> : <Box key={m.id} display="flex" justifyContent='left' >
                        //         <Box align='center' sx={{ bgcolor: '#c0c0c0', width: 'auto', paddingLeft: '10px', paddingRight: '10px', paddingY: '3px', margin: '10px', borderRadius: '5px' }}>
                        //             <Box display='' justifyContent='around'>
                        //                 <Stack direction='row' width='100%' display='flex' justifyContent='space-between'>
                        //                     <Typography variant='body2' alignSelf='center' sx={{ fontSize: '13px' }} >
                        //                         {
                        //                             friend.fname
                        //                         }
                        //                     </Typography>
                        //                     {/* <IconButton size='small' align='right' color='error' onClick={()=>handleDeleteClick(m)}>
                        //                         <DeleteIcon size='small' sx={{height:'15px'}} />
                        //                     </IconButton> */}
                        //                 </Stack>
                        //                 {/* <Typography variant='body2' > */}
                        //                 <pre style={{ margin: 1, fontSize: '13px' }}>
                        //                     {
                        //                         m.date + ' ' + m.month + ' ' + m.year + '   ' + m.time
                        //                     }
                        //                 </pre>
                        //                 {/* </Typography> */}
                        //             </Box>
                        //             <Box bgcolor='#f0f0f0' sx={{ paddingX: '3px', borderRadius: '5px' }}>
                        //                 {
                        //                     m.img !== "" ?
                        //                         <Box sx={{ maxHeight: '19vh', maxWidth: '19vh' }}>
                        //                             <img
                        //                                 style={{ minWidth: '15vh', minHeight: "15vh", maxHeight: '18vh', maxWidth: '18vh' }}
                        //                                 src={m.img}
                        //                                 alt="image"
                        //                             />
                        //                         </Box> :
                        //                         null
                        //                 }
                        //                 <Typography xs={4} variant='body2' sx={{ width: 'auto', maxWidth: { xs: '150px', sm: '180px', md: '250px', ld: '250px' }, height: 'auto', overflow: 'auto' }}>
                        //                     {
                        //                         m.mess
                        //                     }
                        //                 </Typography>
                        //             </Box>
                        //         </Box>

                        //     </Box>
                        // )
                    }
                </Stack>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', marginTop: 'auto' }}>
                    <Stack direction='row' sx={{ background: '#ffffff', marginLeft: '1px', padding: '5px', marginTop: 'auto', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', display: 'flex', width: '99.70%', borderTop: '1.5px solid black' }}>

                        <IconButton onClick={() => handleCamClick()}>
                            <CameraAltIcon />
                            <input type="file" id="file" ref={cam} onChange={(event) => handleFile(event)} style={{ display: "none" }} />
                        </IconButton>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            // PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            {/* <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                Subscribe
                            </DialogTitle> */}
                            <DialogContent>
                                <img
                                    style={{ minWidth: '15vh', minHeight: "15vh", maxHeight: '18vh', maxWidth: '18vh' }}
                                    src={imageField}
                                    alt="image"
                                />
                            </DialogContent>
                            <DialogActions>
                                {/* <Button autoFocus onClick={handleClose}>
                                    Cancel
                                </Button> */}
                                <form onSubmit={formik.handleSubmit}>

                                    <TextField size='small' sx={{ marginX: '10px' }} name="mess" autoComplete='off' onBlur={handleBlur} onChange={handleChange} value={values.mess} />
                                    {/* <Button onClick={handleClose}>Send</Button> */}
                                    <IconButton type='button' color='error' onClick={() => setOpen(false)}>
                                        <CancelIcon />
                                    </IconButton>
                                    <IconButton type='submit' color='success'>
                                        <SendIcon />
                                    </IconButton>
                                </form>
                            </DialogActions>
                        </Dialog>
                        {/* <input type='text' style={{width:'100%',marginLeft:'5px',marginRight:'5px',fontSize:'25px',border:'none',background:'#eeeeee'}} /> */}
                        <TextField size='small' sx={{ width: '300%', marginX: '10px' }} name="mess" autoComplete='off' onBlur={handleBlur} onChange={handleChange} value={values.mess} />
                        <IconButton type='submit' color='success' disabled={formik.values.mess === ''}>
                            <SendIcon />
                        </IconButton>

                    </Stack>
                </form>
            </Stack>
            {/* </Box> */}
        </Box>
    )
}

export default Chat