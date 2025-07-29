"use client"
import AgentCard from '@/components/AgentCard';
import BreadCrumbs from '@/components/BreadCrumbs'
import { Box, FormControl, InputLabel, MenuItem, NativeSelect, Select, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'

function page() {

    const [value, setvalue] = useState(10)
        const temp = [
        {
            id:"1",
            image: "https://eastmls.net/_next/image?url=%2Fproperty.jpg&w=1080&q=75",
            name: "Hussen ali",
            role: "agent1",
            number: "+91 897541132",
            email: "@adminagent@gmail.com",
            property: "3 house"
        },
        {
            id:"2",
            image: "https://eastmls.net/_next/image?url=https%3A%2F%2Feastmls-media.s3.us-east-2.amazonaws.com%2F6858fd3eb1f932ffcdda32e4%2Fproperties%2F6885ec2dc7daa3cd430b2604%2Fimages%2FIMG_0662.jpeg&w=256&q=75",
            name: "Hussen ali2",
            role: "agent2",
            number: "+91 654321789",
            email: "@adminkjdsbcvjagent@gmail.com",
            property: "5 house"
        },
        {
            id:"3",
            image: "https://eastmls.net/_next/image?url=%2Fproperty.jpg&w=1080&q=75",
            name: "Hussen ali3",
            role: "agent3",
            number: "+91 321789654",
            email: "@jdgfuydsgvbj@gmail.com",
            property: "10 house"
        }
    ]

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" >
            Home
        </Link>,

        <Typography key="3" sx={{ color: 'text.primary' }}>
            Agents
        </Typography>,
    ];

    return (
        <Stack display={'flex'} px={5} pt={8} >

            <BreadCrumbs array={breadcrumbs} />
            <Typography variant='h3' mt={5}>Agents</Typography>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={5} gap={4} >
                <AgentCard temp={temp}/>

                <Stack p={2} width={'40%'} padding={3} bgcolor={'rgb(250 250 250)'} borderRadius={3} border={'1px solid #dbdbdb'} height={'50%'} gap={2}>
                    <Typography variant='h6'>Agent search</Typography>
                    <TextField size='small' placeholder='Agent name' sx={{ bgcolor: "white" }}></TextField>

                    <FormControl fullWidth variant="outlined">
                        <Select
                            labelId="age-label"
                            id="outlined-age"
                            value={value}
                            size='small'
                            onChange={(e)=>{setvalue(e.target.value)}}
                            sx={{bgcolor:"white"}}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Box>
        </Stack>
    )
}

export default page
