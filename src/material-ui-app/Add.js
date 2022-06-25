import { Avatar, Box, Button, Fab, Modal, Snackbar, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ImageIcon from '@mui/icons-material/Image';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import api from './api/Posts'
import { useNavigate } from 'react-router-dom';
import Feed from './Feed';
import fireDb from './firebase';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add() {
    const user = useSelector(state => state.user)
    const posts = useSelector(state => state.posts)
    // console.log(posts[posts.length-1].id+1)

    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [imageField, setImageField] = useState("");
    const navigate = useNavigate();



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
        };
    };

    
    const initialValues = {
        desc: "",
        image: ""
    }

    const onSubmit = async (values, onSubmitProps) => {
        values.image = imageField
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        if(values.image === ""){
            toast.error('Please Upload Image Also...', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition:Flip
                });
                onSubmitProps.resetForm()
                return;
        }

        const d = new Date();
        let m = monthNames[d.getMonth()];
        let time = d.getHours() + ' : ' + d.getMinutes()
        let Id
        posts.length === 0 ? Id = 1 : Id = posts[posts.length - 1].id + 1

        var newValues = { ...values, "user": user, "likes": ['.'], 'date': d.getDate(), 'month': m, 'year': d.getFullYear(), "time": time }
        // console.log('Form data', newValues)
        onSubmitProps.setSubmitting('false')
        onSubmitProps.resetForm()

        // api.post('/posts', newValues).then(
        //     setOpen1(true)
        // )
        

        // const res = fetch(
        //     "https://chatapp-bcb75-default-rtdb.firebaseio.com/posts.json",
        //     {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             newValues
        //         })
        //     }
        // )
        // if(res){
        //     console.log("SUCCESS");
        // }





        fireDb.child('posts').push(newValues,(err)=>{
            if(err){
                alert(err)
            }
            else{
                // console.log('Added SS')
            }
            })

            setOpen(false)

        // window.location.reload()


        // setOpen(false)
        // validateUser(values)
        // let flag=0

        // data.map((d) => {
        //     if (d.email === values.email && d.pass === values.pass) {
        //         flag=1
        //         console.log('INSIDE');
        //         d.login = true;
        //         api.put(`/users2/${d.id}`, { 'login': true }).then()

        //         // console.log(d)
        //         dispatch(setUser(d))
        //         window.localStorage.setItem('materialLogin', JSON.stringify(values))
        //         navigate('/');
        //     }
        // });
        // if(flag===0){
        //     alert("Invalid UserId or Password!")
        // }
        // // console.log('redv',data);

        // // setUser(data);


        // // dispatch(addUserDetails(values))
        // // addUserDetails(values)
        // // navigate('/login')
    }

    const validationSchema = Yup.object({
        desc: Yup.string().required("REQUIRED")
    })


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })


    const { handleBlur, handleChange, values, handleSubmit } = formik



    return (
        <>
            {/* <Feed /> */}
            <Tooltip onClick={(e) => setOpen(true)} title='add' sx={{ position: 'fixed', bottom: { xs: '100px', sm: '100px', md: '20px', ld: '20px' }, left: '20px' }}>
                <Fab color='primary' aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Modal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: { xs: '80%', sm: 400, md: 400, lg: 400 }, height: { xs: 400, sm: 350, md: 350, ls: 350 } }} bgcolor="White" padding={3} borderRadius={5} marginX="auto" >
                        <Typography variant='h6' align='center' color='gray'>Create Post</Typography><br />
                        <Stack direction='row' justifyContent="center">
                            <Avatar src={user.img}>{user.fname[0]}</Avatar>
                            <Typography variant='h6' alignSelf='center' marginLeft='10px'>{user.fname}</Typography>
                        </Stack>
                        <form onSubmit={handleSubmit}>
                            <TextField sx={{ width: '100%' }} multiline rows={3} placeholder='Write Here' variant='standard' name="desc" onBlur={handleBlur} onChange={handleChange} value={values.desc} error={(formik.errors.desc && formik.touched.desc)} helperText={formik.errors.desc && formik.touched.desc ? <>{formik.errors.desc}</> : null} />
                            <Stack direction='row' gap={1} mt={2} mb={1}>
                                <EmojiEmotionsIcon color="primary" />
                                <ImageIcon color="warning" />
                                <VideoCameraBackIcon color="success" />
                                <PersonAddIcon color="error" />
                            </Stack>
                            <Button variant="contained" component="label" sx={{ marginBottom: '5px' }}>
                                <PhotoSizeSelectActualIcon />
                                <input type="file" hidden name='image' onBlur={handleBlur} onChange={(event) => handleFile(event)} value={values.image} />
                            </Button>
                            <Button variant="contained" type='submit' sx={{ width: '100%' }}>POST</Button>
                        </form>
                    </Box>
                    <Snackbar message='Post successfully' severity="success" autoHideDuration={4000} open={open1} onClose={() => setOpen1(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />

                </Box>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default Add