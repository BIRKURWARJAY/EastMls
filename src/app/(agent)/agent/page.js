'use client'
import UpdateAgent from '@/components/UpdateAgent'
import { api } from '@/utils/api'
import { Box, Stack, Tabs, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Tab from '@mui/material/Tab';
import UpdatePassword from '@/components/UpdatePassword'
import toast from 'react-hot-toast'

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

  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState('one');
  const apiRef = useRef(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    const fetchagent = async () => {
      try {
       apiRef.current = true;
       const response = await api.get('/agent')
       console.log(response.data.agent);
       setAgent(response.data.agent)
       setLoading(false);
     } catch (error) {
       console.error(error);
        apiRef.current = false;
       toast.error(error.response.data.message);
     }
    }
    !apiRef.current && fetchagent()
  }, [])



  return (
    <>

      {loading ? <LoadingComponent /> :
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} p={1} width={'min'} >
          <Stack border={1} borderRadius={3} >
            <Box bgcolor={'orange'} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={2} borderRadius={3}>
              <img src={agent?.profileImage} style={{ height: "10rem", width: "10rem", objectFit: "cover", borderRadius: "100%", border: "2px solid white" }} alt="" />
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
              value === 'two' && <UpdatePassword agent={agent} setAgent={setAgent} />
            }

          </Stack>
        </Box>}
    </>
  )
}

export default page
