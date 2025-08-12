'use client'
import UpdateAgent from '@/components/UpdateAgent'
import { api } from '@/utils/api'
import { Box, Stack, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tab from '@mui/material/Tab';
import UpdatePassword from '@/components/UpdatePassword'

function page() {
    const [agent, setAgent] = useState({
        username: '',
        email: '',
        phone: '',
        licenseNumber: '',
        instagram: '',
        facebook: '',
        linkedin: ''
    })

    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        const fetchagent = async () => {
            const response = await api.get('/agent', { withCredentials: true })
            console.log(response.data.agent);
            setAgent(response.data.agent)
        }
        fetchagent()
    }, [])



    return (
        <>


            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} p={1} width={'min'} >
                <Stack border={1} borderRadius={3} >
                    <Box bgcolor={'orange'} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={2} borderRadius={3}>
                        <img src={agent?.profileImage} style={{ height: "10rem", width: "10rem", objectFit: "cover !important", borderRadius: "100%", border: "2px solid white" }} alt="" />
                        <Typography variant='h4' mt={1} fontWeight={600} color='white'>{agent?.username}</Typography>
                        <Typography variant='h6' fontWeight={400} color='white'>{agent?.email}</Typography>
                    </Box>

                   
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            centered
                        >
                            <Tab
                                value="one"
                                label="Profile details"
                                
                            />
                            <Tab value="two" label="Change password" />
                        </Tabs>
                   

                    {
                        value === 'one' && <UpdateAgent agent={agent} setAgent={setAgent} />
                    }
                    {
                        value === 'two' && <UpdatePassword agent={agent} setAgent={setAgent}/>
                    }

                </Stack>
            </Box>


        </>
    )
}

export default page
