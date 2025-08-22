'use client'
import UpdateAgent from '@/src/components/UpdateAgent'
import { api } from '@/src/utils/api'
import { Box, Stack, Tabs, Typography } from '@mui/material'
import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
import Tab from '@mui/material/Tab';
import UpdatePassword from '@/src/components/UpdatePassword'
import toast from 'react-hot-toast'
import LoadingComponent from '@/src/components/Loading'
import userInterface from '@/src/interfaces/user.interface'

interface agentInterface extends userInterface {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
} {}

export default function page(): ReactNode {
  const [agent, setAgent] = useState<agentInterface>()

  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = React.useState<string>('one');
  const apiRef: React.RefObject<boolean>= useRef(false);

  const handleChange = (event: ChangeEvent<any>, newValue:string): void => {
    setValue(newValue);
  };


  useEffect(() => {
    const fetchagent = async (): Promise<void> => {
      try {
       apiRef.current = true;
       const response: Axios.AxiosXHR<any> = await api.get('/agent')
       console.log(response.data.agent);
       setAgent(response.data.agent)
       setLoading(false);
     } catch (error:any) {
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
              value === 'one' && <UpdateAgent agent={agent!} setAgent={setAgent} />
            }
            {
              value === 'two' && <UpdatePassword  />
            }

          </Stack>
        </Box>}
    </>
  )
}

