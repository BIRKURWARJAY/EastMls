'use client';
import AgentCard from '@/src/components/AgentCard';
import BreadCrumbs from '@/src/components/BreadCrumbs';
import { api } from '@/src/utils/api';
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
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import LoadingComponent from '@/src/components/Loading';
import toast from 'react-hot-toast';
import userInterface from '@/src/interfaces/user.interface';

let timeId: NodeJS.Timeout | null = null

function Page(): ReactNode {
  const [value, setvalue] = useState<number>(10);
  const [data, setdata] = useState<userInterface[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const apiRef = useRef<boolean>(false);

  useEffect(() => {
    async function fetchAgents(): Promise<void> {
      try {
        apiRef.current = true;
        const response: Axios.AxiosXHR<any> = await api.get('/agent/all')
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


  const breadcrumbs = [
    <Link key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Agents
    </Typography>,
  ];

  const searchAgent = (keyword:string): void => {

    if (timeId) {
      clearTimeout(timeId)
    }

    const timeout = setTimeout(async () => {
      try {
        const response: Axios.AxiosXHR<any> = await api.get(`/agent/search?username=${keyword}`)
        setdata(response.data.agentdetails)
        toast.success(response.data.message)
      } catch (error:any) {
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
            {data?.map((agent, index) =>
              <AgentCard agent={agent} key={index} />
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
