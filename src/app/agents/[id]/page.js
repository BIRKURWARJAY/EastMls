'use client'
import AgentCard from '@/components/AgentCard';
import BreadCrumbs from '@/components/BreadCrumbs';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import LoadingComponent from '@/components/loading';
import { verifyRole } from '@/utils/verifyRole';

function page({ params: paramsPromise }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [agent, setAgent] = useState();

  const params = React.use(paramsPromise);

  useEffect(() => {
    async function validate() {
      const verified = await verifyRole("user");
      if (!verified) {
        toast.error('Your are not allowed')
        router.push('/agent')
        return
      }
      if (verified === 'login required') {
        router.push('/login')
        return
      }

      const fetchAgent = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/user/agent/${params.id}`);
          setAgent(response.data.agent);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      fetchAgent()
    }
    validate();
  }, [params.id, router]);



  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
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
            <AgentCard temp={agent} />
            <Box p={3} boxShadow={'0px 0px 10px 0px #dbdbdb'} borderRadius={5}>
              <Typography variant='h6' fontWeight={600} mb={3}>About Hussen ali</Typography>
              <Typography variant='body1' fontWeight={500}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus commodi tempore maxime ad, asperiores id, assumenda illum obcaecati quibusdam doloremque veniam ducimus fuga officiis minima consectetur, dolorum laborum nulla aliquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, quod!</Typography>

            </Box>
          </Box>

          {/* <SellerEnquiry data={agent} /> */}
        </Box>
      </Stack>}

    </>
  )
}

export default page
