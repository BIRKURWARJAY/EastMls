'use client';
import AgentCard from '@/components/AgentCard';
import BreadCrumbs from '@/components/BreadCrumbs';
import { api } from '@/utils/api';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import LoadingComponent from '@/components/Loading';
import toast from 'react-hot-toast';

let timeId = null

function Page() {
  const [value, setvalue] = useState(10);
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState();
  const apiRef = useRef(false);


  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true);
        const response = await api.get('/agent/all')
        apiRef.current = true;
        setdata(response.data.agents)
        setLoading(false);
      } catch (error) {
        console.log(error);
        apiRef.current = false;
        setLoading(false);
      }
    }
    
   !apiRef.current && fetchAgents();
  }, [])

        console.log('hhhhhhhhhhh', data);

  const breadcrumbs = [
    <Link key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Agents
    </Typography>,
  ];

  const searchAgent = (keyword) => {

    if (timeId) {
      clearTimeout(timeId)
    }

    const timeout = setTimeout(async () => {
      // console.log("called");
      try {
        const response = await api.get(`/agent/search?username=${keyword}`)
        console.log(response);
        setdata(response.data.agentdetails)
        toast.success(response.data.message)
      } catch (error) {
        setdata([])
        toast.error(error.response.data.message)
        console.log('error', error);

      }
    }, 1000);

    timeId = timeout
  }

  return (
    <>
      {isLoading ? <LoadingComponent /> : <Stack display="flex" px={{ xs: 2, md: 5 }} pt={{ xs: 4, md: 8 }}>
        <BreadCrumbs array={breadcrumbs} />
        <Typography variant="h3" mt={5} fontSize={{ xs: '2rem', md: '3rem' }}>
          Agents
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="center"
          alignItems="flex-start"
          mt={5}
          gap={4}
        >
          <Box flex={1}>
            {data?.map((agent,index) => 
              <AgentCard agent={agent} key={index}/>
              
            )}
          </Box>

          <Stack
            p={3}
            width={{ xs: '100%', md: '40%' }}
            bgcolor="rgb(250 250 250)"
            borderRadius={3}
            border="1px solid #dbdbdb"
            gap={2}
          >
            <Typography variant="h6">Agent search</Typography>

            <TextField
              size="small"
              placeholder="Agent name"
              sx={{ bgcolor: 'white' }}
              fullWidth
              onChange={(e) => searchAgent(e.target.value)}
            />

            <FormControl fullWidth>
              <Select
                labelId="agent-filter-label"
                id="agent-filter"
                value={value}
                size="small"
                onChange={(e) => setvalue(e.target.value)}
                sx={{ bgcolor: 'white' }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
      }
    </>
  )
}

export default Page;
