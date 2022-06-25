// import { createTheme } from '@mui/icons-material'
import { DatePicker, DateTimePicker, Masonry, TabContext, TabList, TabPanel, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimePicker } from '@mui/lab'
import { Stack, Tab, TextField, Paper, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {styled} from '@mui/material'

const StyledBox = styled(Box)(({theme})=>({
    height:250,
    width:250,
    backgroundColor: theme.status.danger
    // backgroundColor: theme.neutral?.main

}))


function Example3() {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const [value,setValue] = useState('1')

    const heights=[100,150,130,120,80,90,70,80,160,50,80,60,70,110,130]


    const handleChange =(event,newValue)=>{
        setValue(newValue)
    }

    // console.log({ selectedDate });
    // console.log(selectedTime);
    // console.log(value);
    return (
        <div>
            <Stack spacing={4} sx={{ width: 250 }}>
                <DatePicker label='Date Picker' renderInput={(params) => <TextField {...params} />} value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
                <TimePicker label='Time Picker' renderInput={(params) => <TextField {...params} />} value={selectedTime} onChange={(newValue) => setSelectedTime(newValue)} />
                <DateTimePicker label='Date Time Picker' renderInput={(params) => <TextField {...params} />} value={selectedTime} onChange={(newValue) => setSelectedTime(newValue)} />
            </Stack>





            {/* <Box width="500px">
                <DateRangePicker startText='Chech-in' endText='Check-out' value={value} onChange={(newValue)=>setValue(newValue)} renderInput={(startProps,endProps)=>(<>
                <TextField {...startProps} />
                <Box sx={{mx:2}}> to </Box>
                <TextField {...endProps} />
                </>)} />
            </Box> */}




            <Box>
                <TabContext value={value}>
                    <Box sx={{ borderBottom:1, borderColor:'divider', width:300}}>
                        <TabList aria-label='Tabs example' onChange={handleChange} textColor='secondary' indicatorColor='secondary' variant='scrollable' scrollButtons='auto'>
                            <Tab label='Tab One' value='1' />
                            <Tab label='Tab Two' value='2' disabled />
                            <Tab label='Tab Three' value='3' />
                            <Tab label='Tab One' value='4' />
                            <Tab label='Tab Two' value='5' />
                            <Tab label='Tab Three' value='6' />
                        </TabList>
                    </Box>
                    <TabPanel value='1'>Panel One</TabPanel>
                    <TabPanel value='2'>Panel Two</TabPanel>
                    <TabPanel value='3'>Panel Three</TabPanel>
                    <TabPanel value='4'>Panel One</TabPanel>
                    <TabPanel value='5'>Panel Two</TabPanel>
                    <TabPanel value='6'>Panel Three</TabPanel>
                </TabContext>
            </Box>


            <Timeline position='alternate'>
                <TimelineItem>
                    <TimelineOppositeContent color='text.secondary'>9:30 AM</TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot color='secondary' />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        City A
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color='secondary' />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        City B
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color='secondary' />
                        {/* <TimelineConnector /> */}
                    </TimelineSeparator>
                    <TimelineContent>
                        City C
                    </TimelineContent>
                </TimelineItem>
            </Timeline>




            <Box sx={{width:500, height:400, bgcolor:'yellow'}}>
                <Masonry columns={4} spacing={1}>
                    {
                        heights.map((height,index)=>(
                            <Paper key={index} sx={{/*display:'flex', justifyContent:'center', alignItems:'center', height,*/ border:'1px solid'}}>
                                <Accordion sx={{minHeight:height}}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Accordion {index + 1}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>Content</AccordionDetails>
                                </Accordion>
                            </Paper>
                        ))
                    }
                </Masonry>
            </Box>




            <Box m={5} sx={{height:300, width:{ xs:100, sm:200, md:300, lg:400, xl:500}, bgcolor:'secondary.dark', marginTop:"100px"}}>

            </Box>


            <StyledBox />





        </div>
    )
}

export default Example3