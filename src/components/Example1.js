import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Autocomplete, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, ImageList, ImageListItem, InputAdornment, Menu, MenuItem, Paper, Radio, RadioGroup, Rating, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { useState } from 'react';
import { Box, margin } from '@mui/system';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Example1() {
    const [formats, setFormats] = useState([])
    const [value, setValue] = useState('')
    const [country, setCountry] = useState('')
    const [s1, setS1] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [anchor, setAnchor] = useState(null)


    const open = Boolean(anchor)



    const itemData = [
        {
            img: 'https://unsplash.com/photos/BmXvhwfVXlM',
            title: 'Breakfast'
        },
        {
            img: 'https://images.unsplash.com/photo-1654021649783-645a5e663c09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
            title: 'burger'
        },
        {
            img: 'https://images.unsplash.com/photo-1654045851484-d9aea271acda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
            title: 'burger'
        }
    ]


    const skills = ['HTML', 'JAVA', 'PYTHON', 'REACT', 'NODE', 'MONGO']

    console.log(s1)

    const changeSwitchHandler = (event) => {
        setS1(event.target.checked)
    }



    console.log(country);

    // console.log(formats);
    const handleFormateChange = (_event, updatedFormats) => {
        setFormats(updatedFormats)
    }


    const handleExpandChange = (isExpanded, panel) => {
        console.log(isExpanded, panel)
        setExpanded(isExpanded ? panel : false)
    }


    const handleMenuClick = (event) => {
        setAnchor(event.currentTarget)
    }


    const handleMenuClose = () => {
        setAnchor(null)
    }

    return (
        <div>
            <h1>React MUI</h1>
            <Stack spacing={4}>
                <Stack spacing={2} display='block' direction='row'>
                    <button>Normal</button>
                    <Button color='success' variant='contained' size='large' onClick={() => alert("contained variant")}>contained</Button>
                    <Button color='primary' variant='outlined' onClick={() => alert("outlined variant")}>outlined</Button>
                    <Button color='warning' variant='text' onClick={() => alert("text variant")}>text</Button>
                    <Button color='warning' variant='outlined' size='small' disabled onClick={() => alert("text variant")}>Disabled</Button>
                    <Button color='warning' variant='text' href='#hrefUse' >LINK href</Button>

                    <Button variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                    <Button variant="contained" endIcon={<SendIcon />}>Send</Button>
                </Stack>
                <Stack spacing={2} direction='row'>
                    <Button color='primary' variant='contained'>Primary</Button>
                    <Button color='secondary' variant='contained'>Secondary</Button>
                    <Button color='warning' variant='contained'>warning</Button>
                    <Button color='info' variant='contained'>Info</Button>
                    <Button color='success' variant='contained'>Success</Button>
                    <Button color='error' variant='contained'>error</Button>

                    <IconButton aria-label='camera' color='primary' variant='outlined'><CameraAltIcon /></IconButton>
                </Stack>
            </Stack>

            <div>
                <ButtonGroup variant='contained' color='error'>
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup><br /><br />
                <ButtonGroup orientation='vertical' variant='outlined' color='warning'>
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup><br /><br />
            </div>

            <div>
                Typography
                <Typography variant='h1'>h1 in Typography</Typography>
                <Typography variant='h2'>h2 in Typography</Typography>
                <Typography variant='h3'>h3 in Typography</Typography>
                <Typography variant='h4' gutterBottom>h4 in Typography</Typography>
                <Typography variant='h5'>h5 in Typography</Typography>
                <Typography variant='h6'>h6 in Typography</Typography>
                <Typography variant='subtitle1'>sub title 1 in Typography</Typography>
                <Typography variant='subtitle2'>sub title 2 in Typography</Typography>
                <Typography variant='body1'>body 1 in Typography default </Typography>
                <Typography variant='body2'>body 2 in Typography</Typography>
            </div>

            <Stack direction='row'>
                <ToggleButtonGroup aria-label='text formatting' value={formats} onChange={handleFormateChange} color='primary' variant='outlined' /*exclusive*/>
                    <ToggleButton value='bold' aria-label='bold'><FormatBoldIcon /></ToggleButton>
                    <ToggleButton value='italic' aria-label='italic'><FormatItalicIcon /></ToggleButton>
                    <ToggleButton value='underlined' aria-label='underlined'><FormatUnderlinedIcon /></ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <br /><br />

            {/* .........TextField....... */}
            <Stack spacing={3}>
                <Stack direction='row'>
                    <TextField label='variant outlined' variant='outlined' value={value} onChange={(e) => setValue(e.target.value)} error={!value} helperText={!value ? 'Required' : 'Success'}></TextField>
                    <TextField label='variant outlined' variant='outlined' required></TextField>
                    <TextField label='variant filled' variant='filled' helperText='helperText Example'></TextField>
                    <TextField label='variant standard' variant='standard'></TextField>
                </Stack>
            </Stack>


            <Stack spacing={3}>
                <Stack direction='row'>
                    <TextField label='Amount' variant='outlined' InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}></TextField>
                    <TextField label='Amount' variant='outlined' InputProps={{ endAdornment: <InputAdornment position='end'>kg</InputAdornment> }}></TextField>
                </Stack>
            </Stack>

            {/* .........select....... */}
            <Box width='250px'>
                <TextField label='Select Country' select value={country} onChange={(e) => setCountry(e.target.value)} fullWidth>
                    <MenuItem value="IND">India</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="AUS">Australia</MenuItem>
                </TextField>
            </Box>

            {/* .........radio button....... */}
            <Box>
                <FormControl>
                    <FormLabel id='job-experience-group-label'>
                        years of experience
                    </FormLabel>
                    <RadioGroup name='job-experience-group' aria-labelledby='job-experience-group-label' row>
                        <FormControlLabel control={<Radio />} label='0-2' value='0-2' />
                        <FormControlLabel control={<Radio />} label='3-5' value='3-5' />
                        <FormControlLabel control={<Radio />} label='6-10' value='6-10' />
                    </RadioGroup>
                </FormControl>
            </Box>



            {/* .........Checkbox....... */}
            <Box>
                <Box>
                    <FormControlLabel label="I Accept Conditions" control={<Checkbox />} />
                </Box>
                <Box>
                    <Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} />
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>Skills</FormLabel>
                        <FormGroup>
                            <FormControlLabel label="HTML" control={<Checkbox value='html' />} />
                            <FormControlLabel label="JAVA" control={<Checkbox value='java' />} />
                            <FormControlLabel label="PYTHON" control={<Checkbox value='Python' />} />
                        </FormGroup>
                    </FormControl>
                </Box>
            </Box>



            {/* .........Switch....... */}
            <Box>
                <FormControlLabel label='Dark Mode' control={<Switch />} onChange={changeSwitchHandler} />
            </Box>





            {/* .........rating....... */}
            <Box>
                <Stack>
                    <Rating />
                </Stack>
            </Box>
            <Box>
                <Stack>
                    <Rating icon={<BookmarkBorderIcon />}></Rating>
                </Stack>
            </Box>


            {/* .........auto complete....... */}

            <Box>
                <Stack spacing={2} width='250px'>
                    <Autocomplete options={skills} renderInput={(params) => <TextField {...params} label='Skills' />} />
                </Stack>
            </Box>


            {/* .........Box....... */}
            <Box sx={{
                backgroundColor: 'yellow',
                color: 'red',
                height: '100px',
                width: '100px',
                padding: '16px',
                '&:hover': {
                    backgroundColor: 'red',
                    color:'yellow'
                },
            }}>
                Hello
            </Box>
            <Box display='flex' height='100px' width='100px' bgcolor='green' p={2}>Hello 2</Box><br />


            <Paper sx={{ padding: '32px', margin: '32px' }} elevation={4} >
                {/* .........Stack....... */}
                <Stack sx={{ border: '3px solid' }} direction='row' spacing={2} divider={<Divider orientation='vertical' flexItem />}>
                    <Box sx={{
                        backgroundColor: 'yellow',
                        color: 'red',
                        height: '100px',
                        width: '100px',
                        padding: '16px',
                        '&:hover': {
                            backgroundColor: 'green',
                        },
                    }}>
                        Hello
                    </Box>
                    <Box display='flex' height='100px' width='100px' bgcolor='green' p={2}>Hello 2</Box>
                </Stack>



                {/* .........Grid....... */}
                <Grid container my={3}>
                    <Grid item xs={12} sm={6}>
                        <Box bgcolor='deepskyblue' p={2}>Item 1</Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box bgcolor='deepskyblue' p={2}>Item 2</Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box bgcolor='deepskyblue' p={2}>Item 3</Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box bgcolor='deepskyblue' p={2}>Item 4</Box>
                    </Grid>
                </Grid>
            </Paper>




            {/* .........Card........ */}
            <Box width='300px'>
                <Card>
                    <CardMedia component='img' height='140' image='https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='Image' />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>Aniket</Typography>
                        <Typography variant='body2' color='GrayText.secondary'>Closing in on a decade of client-side routing, React Router v6 takes the best features from previous versions—and its sister project, Reach Router—in our smallest and most powerful package yet.</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small'>Share</Button>
                        <Button size='small'>Learn more</Button>
                    </CardActions>
                </Card>
            </Box>



            {/* .............Accordion............. */}
            <Box>
                <Accordion expanded={expanded === 'panel1'} onChange={(event, isExpanded) => handleExpandChange(isExpanded, 'panel1')} >
                    <AccordionSummary id='panel1-header' aria-controls='panel1-content' expandIcon={<ExpandMoreIcon />} >
                        <Typography>Accordion 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Closing in on a decade of client-side routing, React Router v6 takes the best features from previous versions—and its sister project, Reach Router—in our smallest and most powerful package yet.</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={(event, isExpanded) => handleExpandChange(isExpanded, 'panel2')}>
                    <AccordionSummary id='panel2-header' aria-controls='panel2-content' expandIcon={<ExpandMoreIcon />} >
                        <Typography>Accordion 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Closing in on a decade of client-side routing, React Router v6 takes the best features from previous versions—and its sister project, Reach Router—in our smallest and most powerful package yet.</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={(event, isExpanded) => handleExpandChange(isExpanded, 'panel3')}>
                    <AccordionSummary id='panel3-header' aria-controls='panel3-content' expandIcon={<ExpandMoreIcon />} >
                        <Typography>Accordion 3</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Closing in on a decade of client-side routing, React Router v6 takes the best features from previous versions—and its sister project, Reach Router—in our smallest and most powerful package yet.</Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>


            {/* .............ImageList............. */}
            <Box sx={{ p: 4 }}>
                <Stack spacing={4}>
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {
                            itemData.map(item => (
                                <ImageListItem key={item.img}>
                                    <img src={`$item.img?w=164&h=164&fit=crop&auto=format&dpr=2`} alt={item.title} loading='lazy' />
                                </ImageListItem>
                            ))
                        }
                    </ImageList>
                </Stack>
            </Box>




            {/* .............navbar  or  AppBar............. */}
            <Box>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton size="large" edge='start' color='inherit' aria-label='logo'>
                            <CatchingPokemonIcon />
                        </IconButton>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                            EXAMPLE APP
                        </Typography>
                        <Stack direction='row' spacing={2}>
                            <Button color='inherit'>Features</Button>
                            <Button color='inherit'>Pricing</Button>
                            <Button color='inherit'>About</Button>
                            <Button color='inherit' id='resources-button' onClick={handleMenuClick} /*aria-control={open ? 'resources-menu' : undefined}*/ aria-haspopup='true' aria-expanded={open ? 'true' : undefined} endIcon={<KeyboardArrowDownIcon />}>Resources</Button>
                            <Button color='inherit'>Login</Button>
                        </Stack>
                        <Menu id='resources-menu' anchorEl={anchor} open={open} MenuListProps={{ 'aria-labelledby': 'resources-button' }} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            <MenuItem onClick={handleMenuClose}>Blog</MenuItem>
                            <MenuItem onClick={handleMenuClose}>PodCast</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>















        </div>
    )
}

export default Example1