'use client'
import AgentCard from '@/src/components/AgentCard';
import BreadCrumbs from '@/src/components/BreadCrumbs';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { api } from '@/src/utils/api'
import LoadingComponent from '@/src/components/Loading';



function page({ params }:any) {
  const [isLoading, setLoading] = useState(true);
  const [agent, setAgent] = useState();
  const apiRef = useRef(false);


  useEffect(() => {
    const fetchAgent = async () => {
      try {
        apiRef.current = true;
        setLoading(true);
        const response = await api.get(`/user/agent/${params.id}`);
        setAgent(response.data.agent);
        setLoading(false);
      } catch (error) {
        console.error(error);
        apiRef.current = false;
        setLoading(false);
      }
    };

    !apiRef.current && fetchAgent();
  }, []);



  const breadcrumbs = [
    <Link  key="1" color="inherit" href="/" >
      Home
    </Link>,

    <Typography key="3" sx={{ color: 'text.primary' }}>
      About
    </Typography>,
  ];

  return (
    <>
      {isLoading ? <LoadingComponent /> : <Stack px={5} pt={8} display={'flex'} >
        <BreadCrumbs array={breadcrumbs} />


        <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} mt={6} justifyContent={'space-between'} >
          <Box >
            <AgentCard agent={agent!} />
            <Box p={3} boxShadow={'0px 0px 10px 0px #dbdbdb'} borderRadius={5}>
              <Typography variant='h6' fontWeight={600} mb={3}>About Hussen ali</Typography>
              <Typography variant='body1' fontWeight={500}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus commodi tempore maxime ad, asperiores id, assumenda illum obcaecati quibusdam doloremque veniam ducimus fuga officiis minima consectetur, dolorum laborum nulla aliquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, quod!</Typography>

            </Box>
          </Box>

        </Box>
      </Stack>}

    </>
  )
}

export default page
