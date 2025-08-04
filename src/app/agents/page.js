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
import React, { useEffect, useState } from 'react';
import decodeToken from '@/utils/decodeToken';
import { useRouter } from 'next/navigation';
import LoadingComponent from '@/components/loading';


function Page() {
  const router = useRouter();
  const [value, setvalue] = useState(10);
  const [data, setdata] = useState();
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const tokenRes = decodeToken("user", router);

    const fetchagent = async () => {
      try {
        setLoading(true);
        const response = await api.get('/agent')
        console.log(response, data);
        setdata(response.data.agents)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    tokenRes && fetchagent()
  }, [])


  const breadcrumbs = [
    <Link key="1" color="inherit" href="/">
      Home
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      Agents
    </Typography>,
  ];

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
            <AgentCard temp={data} />
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
