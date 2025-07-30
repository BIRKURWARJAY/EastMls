import AgentCard from '@/components/AgentCard';
import BreadCrumbs from '@/components/BreadCrumbs';
import SellerEnquiry from '@/components/SellerEnquiry';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'

async function page({ params }) {

    const { id } = await params
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
            <Stack px={5} pt={8} display={'flex'} >
                <BreadCrumbs array={breadcrumbs} />


                <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} mt={6} justifyContent={'space-between'} >
                    <Box >
                        <AgentCard temp={temp} />
                        <Box p={3}  boxShadow={'0px 0px 10px 0px #dbdbdb'} borderRadius={5}>
                            <Typography variant='h6' fontWeight={600} mb={3}>About Hussen ali</Typography>
                            <Typography variant='body1' fontWeight={500}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus commodi tempore maxime ad, asperiores id, assumenda illum obcaecati quibusdam doloremque veniam ducimus fuga officiis minima consectetur, dolorum laborum nulla aliquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, quod!</Typography>

                        </Box>
                    </Box>

                    <SellerEnquiry />
                </Box>
            </Stack>

        </>
    )
}

export default page
