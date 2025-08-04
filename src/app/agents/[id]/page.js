import AgentCard from '@/components/AgentCard';
import BreadCrumbs from '@/components/BreadCrumbs';
import SellerEnquiry from '@/components/SellerEnquiry';
import decodeToken from '@/utils/decodeToken';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import LoadingComponent from '@/components/loading';

function page({ params }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [agent, setAgent] = useState();

  useEffect(() => {
    const tokenRes = decodeToken("user", router);
    
    const fetchAgent = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/agent/${params.id}`);
        setAgent(response.data.agent);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    tokenRes && fetchAgent();
  }, []);

  const { id } = params
  console.log(id);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
      Home
    </Link>,

    <Typography key="3" sx={{ color: 'text.primary' }}>
      About
    </Typography>,
  ];

  const temp = [
    {
      id: "1",
      image: "https://eastmls.net/_next/image?url=%2Fproperty.jpg&w=1080&q=75",
      name: "Hussen ali",
      role: "agent1",
      number: "+91 897541132",
      email: "@adminagent@gmail.com",
      property: "3 house"
    },

  ]

  return (
    <>
      {isLoading ? <LoadingComponent /> : <Stack px={5} pt={8} display={'flex'} >
        <BreadCrumbs array={breadcrumbs} />


        <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} mt={6} justifyContent={'space-between'} >
          <Box >
            <AgentCard temp={temp} />
            <Box p={3} boxShadow={'0px 0px 10px 0px #dbdbdb'} borderRadius={5}>
              <Typography variant='h6' fontWeight={600} mb={3}>About Hussen ali</Typography>
              <Typography variant='body1' fontWeight={500}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus commodi tempore maxime ad, asperiores id, assumenda illum obcaecati quibusdam doloremque veniam ducimus fuga officiis minima consectetur, dolorum laborum nulla aliquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, quod!</Typography>

            </Box>
          </Box>

          <SellerEnquiry />
        </Box>
      </Stack>}

    </>
  )
}

export default page
