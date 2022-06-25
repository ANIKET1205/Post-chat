import { Button, Stack, Link, Typography, Box, Breadcrumbs, Drawer, IconButton, Badge, Chip, Tooltip, Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Alert, AlertTitle, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, LinearProgress, Skeleton } from "@mui/material";
import { SpeedDial, SpeedDialIcon, SpeedDialAction, BottomNavigation, BottomNavigationAction, Avatar, AvatarGroup, List, ListItem, ListItemText, ListItemIcon, ListItemAvatar, ListItemButton, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Share } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import {LoadingButton} from "@mui/lab"


function Example2() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },3000)
    },[])




    const handleChange = (event, reason) => {
        if (reason === 'Clickaway') {
            return
        }
        setOpen(false)
    }


    return (
        <div>
            <Button>Hello</Button>
            <Stack spacing={2} direction='row' m={4}>

                <Link href="#">Link</Link>
                <Typography variant="h6">
                    <Link href="#" color='secondary' underline="hover">Secondary</Link>
                </Typography>
            </Stack>





            <Box m={2}>
                <Breadcrumbs aria-label="breacrumb" separator="|" maxItems={2} itemsAfterCollapse={2}>
                    <Link underline="hover" href="#">Home</Link>
                    <Link underline="hover" href="#">Catalog</Link>
                    <Link underline="hover" href="#">Accessories</Link>
                    <Typography color="text.primary">Shoes</Typography>
                </Breadcrumbs>
            </Box>






            <IconButton size="large" edge='start' color='inherit' aria-label="logo" onClick={() => setIsDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width="250px" textAlign='center' role='presentation'>
                    <Typography variant='h6' component='div'>
                        Side Panel
                    </Typography>
                </Box>
            </Drawer>





            {/* ..............SpeedDial............. */}
            <SpeedDial ariaLabel="Navigation speed dial" sx={{ position:'absolute', bottom:16, right: 16, position:'fixed'}} icon={<SpeedDialIcon openIcon={<MenuIcon />} />}  >
                <SpeedDialAction icon={<ContentCopyIcon />} tooltipTitle="copy" tooltipOpen />
                <SpeedDialAction icon={<PrintIcon />} tooltipTitle="print" />
                <SpeedDialAction icon={<Share />} tooltipTitle="share" />
            </SpeedDial>






            {/* .........BottomNavigation............ */}
            <BottomNavigation sx={{ width: '100%', position: 'absolute', bottom: 0 }} value={value} onChange={(event, newValue) => setValue(newValue)} showLabels>
                <BottomNavigationAction label='Home' icon={<HomeIcon />} />
                <BottomNavigationAction label='Favorite' icon={<FavoriteIcon />} />
                <BottomNavigationAction label='Profile' icon={<PersonIcon />} />
            </BottomNavigation>







            {/* ..........Avtar............ */}
            <Stack spacing={4}>
                <Stack direction='row' spacing={1}>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>AB</Avatar>
                    <Avatar sx={{ bgcolor: 'success.light' }}>DB</Avatar>
                </Stack>
                <Stack direction='row' spacing={1}>
                    <AvatarGroup max={3}>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>AB</Avatar>
                        <Avatar sx={{ bgcolor: 'success.light' }}>DB</Avatar>
                        <Avatar src='https://randomuser.me/portraits/men/79.jpg' alt="sd" />
                        <Avatar src='https://randomuser.me/portraits/men/10.jpg' alt="sd" />
                    </AvatarGroup>
                </Stack>
                <Stack direction='row' spacing={1}>
                    <Avatar variant="square" sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>AB</Avatar>
                    <Avatar variant="rounded" sx={{ bgcolor: 'success.light', width: 48, height: 48 }}>DB</Avatar>
                </Stack>
            </Stack>





            {/* ...........Badge........... */}
            <Stack spacing={2} direction='row' m={3}>
                <Badge badgeContent={5} color="primary">
                    <MailIcon />
                </Badge>
                <Badge badgeContent={0} color="secondary" showZero>
                    <MailIcon />
                </Badge>
                <Badge badgeContent={100} color="secondary" showZero max={999}>
                    <MailIcon />
                </Badge>
                <Badge variant="dot" color="secondary" showZero>
                    <MailIcon />
                </Badge>
            </Stack>









            {/* ............List............... */}
            <Box sx={{ width: 400, bgcolor: '#efefe5',borderRadius:'10px' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MailIcon />
                                    </Avatar>
                                </ListItemAvatar>
                            </ListItemIcon>
                            <ListItemText primary='List item 1' secondary="Secondary text" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MailIcon />
                                    </Avatar>
                                </ListItemAvatar>
                            </ListItemIcon>
                            <ListItemText primary='List item 2' secondary="Secondary text" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MailIcon />
                                    </Avatar>
                                </ListItemAvatar>
                            </ListItemIcon>
                            <ListItemText primary='List item 3' secondary="Secondary text" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>








            {/* ...............Chip............ */}
            <Stack direction='row' spacing={1}>
                <Chip label='chip' color='primary' size='small'></Chip>
                <Chip label='chip Outline' color='secondary' size='small' variant="outlined" avatar={<Avatar />}></Chip>
            </Stack>




            {/* .........Tooltip......... */}
            <Tooltip title='Delete' placement="top" arrow enterDelay={500} leaveDelay={1000}>
                <IconButton>
                    <MenuIcon />
                </IconButton>
            </Tooltip>










            {/* ...........Table.......... */}
            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table aria-label='Simple tabel' stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData.map((data) => (
                                <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.first_name}</TableCell>
                                    <TableCell>{data.last_name}</TableCell>
                                    <TableCell align="center">{data.email}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>









            {/* ...........alert........... */}
            <Stack spacing={3}>
                <Alert severity='error'>This is an Error Alert</Alert>
                <Alert severity='warning'>This is an warning Alert</Alert>
                <Alert severity='success'>This is an success Alert</Alert>
                <Alert severity='info'>This is an info Alert</Alert>

                <Alert variant="outlined" severity='error'>This is an Error Alert</Alert>
                <Alert variant="outlined" severity='warning'>This is an warning Alert</Alert>
                <Alert variant="outlined" severity='success'>This is an success Alert</Alert>
                <Alert variant="outlined" severity='info'>This is an info Alert</Alert>

                <Alert variant="filled" severity='error' onClose={() => alert('close')}>
                    <AlertTitle>Error</AlertTitle>
                    This is an Error Alert</Alert>
                <Alert onClose={() => alert('close')} variant="filled" severity='warning'>This is an warning Alert</Alert>
                <Alert onClose={() => alert('close')} icon={<MenuIcon />} variant="filled" severity='success'>This is an success Alert</Alert>
                <Alert onClose={() => alert('close')} variant="filled" severity='info'>This is an info Alert</Alert>
            </Stack>








            {/* .........Snackbar......... */}
            <>
                <Button onClick={() => setOpen(true)}>Submit</Button>
                <Snackbar message='Form Submitted successfully' autoHideDuration={4000} open={open} onClose={handleChange} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
            </>







            {/* .......Dialog......... */}
            <>
                <Button onClick={() => setOpen1(true)}>Open dialog</Button>
                <Dialog aria-label="dialog-title" aria-describedby="dialog-description" open={open1} onClose={() => setOpen1(false)}>
                    <DialogTitle id='dialog-title'>Submit test ?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='dialog-description'>Are you sure you want to submit?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen1(false)} autoFocus>Cancle</Button>
                        <Button onClick={() => setOpen1(false)} autoFocus>Submit</Button>
                    </DialogActions>
                </Dialog>
            </>






            {/* .........Progress............ */}
            <Stack spacing={2}>
                <CircularProgress />
                <CircularProgress color='success' />
                <CircularProgress variant="determinate" value={80} />

                <LinearProgress />
                <LinearProgress color='success' />
                <LinearProgress variant="determinate" value={80} />
            </Stack>






            {/* .........skeleton........... */}
            <Stack spacing={1} width='250px'>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="circular" width={40} height={40} animation="wave" />
                <Skeleton variant="rectangular" width={150} height={100} animation="wave" />
            </Stack>
            <Box spacing={2} sx={{ width: 250 }}>
                {
                    loading ? (
                        <Skeleton variant='rectangular' width={256} height={144} animation="wave" />
                    ) : (
                        <img src='https://media.istockphoto.com/photos/man-using-calculate-domestic-bills-on-wooden-desk-in-office-and-picture-id1328500687?b=1&k=20&m=1328500687&s=170667a&w=0&h=ihPn_ZcjaHsGHxYO0D0fJmklLLfzsL7LQt-9BoMJjBM=' alt='hsi' width={256} height={144} />
                    )
                }
                <Stack direction='row' spacing={1} sx={{ width: '100%', marginTop: '12px' }}>
                    {
                        loading ? (
                            <Skeleton variant="circular" width={40} height={40} animation="wave" />
                        ) : <Avatar></Avatar>
                    }
                </Stack>
                <Stack sx={{ width: '80%' }}>
                    {
                        loading ? (
                            <>
                                <Typography variant='body1'>
                                    <Skeleton variant="text" width="100%" animation='wave' />
                                </Typography>
                                <Typography variant='body2'>
                                    <Skeleton variant="text" width="100%" animation='wave' />
                                </Typography>
                            </>
                        ) : (
                            <Typography variant='body1'>Hello Material UI</Typography>
                        )
                    }
                </Stack>
            </Box>







            {/* .........Loading button ............ */}
            <Stack spacing={2} direction='row'>
                <LoadingButton variant='outlined'>Submit</LoadingButton>
                <LoadingButton loading variant='outlined' loadingIndicator='Loading...'>Submit</LoadingButton>

            </Stack>








        </div>
    )
}


const tableData = [{
    "id": 1,
    "first_name": "Tera",
    "last_name": "Impleton",
    "email": "timpleton0@e-recht24.de",
    "gender": "Female",
    "ip_address": "227.156.235.75"
}, {
    "id": 2,
    "first_name": "Rockie",
    "last_name": "Danett",
    "email": "rdanett1@icio.us",
    "gender": "Male",
    "ip_address": "19.150.132.209"
}, {
    "id": 3,
    "first_name": "Chryste",
    "last_name": "Imeson",
    "email": "cimeson2@baidu.com",
    "gender": "Female",
    "ip_address": "54.248.195.205"
}, {
    "id": 4,
    "first_name": "Gordon",
    "last_name": "Glader",
    "email": "gglader3@answers.com",
    "gender": "Male",
    "ip_address": "134.214.52.136"
}, {
    "id": 5,
    "first_name": "Devonna",
    "last_name": "Stibbs",
    "email": "dstibbs4@vimeo.com",
    "gender": "Female",
    "ip_address": "28.35.200.245"
}, {
    "id": 6,
    "first_name": "Aaron",
    "last_name": "Strathearn",
    "email": "astrathearn5@taobao.com",
    "gender": "Male",
    "ip_address": "237.76.235.131"
}, {
    "id": 7,
    "first_name": "Elsi",
    "last_name": "Stenson",
    "email": "estenson6@rediff.com",
    "gender": "Female",
    "ip_address": "149.238.254.218"
}, {
    "id": 8,
    "first_name": "Cam",
    "last_name": "Hauch",
    "email": "chauch7@berkeley.edu",
    "gender": "Male",
    "ip_address": "117.38.69.4"
}, {
    "id": 9,
    "first_name": "Keely",
    "last_name": "Derrett",
    "email": "kderrett8@springer.com",
    "gender": "Female",
    "ip_address": "123.213.147.174"
}, {
    "id": 10,
    "first_name": "Harmony",
    "last_name": "Grovier",
    "email": "hgrovier9@comsenz.com",
    "gender": "Female",
    "ip_address": "160.208.11.125"
}]

export default Example2