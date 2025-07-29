"use client"
import BreadCrumbs from '@/components/BreadCrumbs';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import { IosShareOutlined } from '@mui/icons-material';
import Overview from '@/components/Overview';
import Propertydetails from '@/components/Propertydetails';
import SellerEnquiry from '@/components/SellerEnquiry';

function page() {

  const params = useParams()
  console.log(params);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
      East mls
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"

    >
      property
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      villa
    </Typography>,
  ];

  return (
    <>
      <Box px={6} gap={10} pt={7}>

        <BreadCrumbs array={breadcrumbs} />

        <Stack mt={5} display={'flex'} direction={'row'} justifyContent={'space-between'}>

          <Box>
            <Typography variant='h4' fontWeight={600}>Villa In Kilimani</Typography>
            <Box display={'flex'} gap={1} alignItems={'center'} mt={2}>
              <Typography variant='body2' borderRadius={1} fontWeight={300} bgcolor={'orange'} color='white' p={0.5}>For sale</Typography>
              <Typography><MapOutlinedIcon />House in Kilimani</Typography>
              <Typography><DateRangeOutlinedIcon />1995</Typography>
            </Box>
            <Box display={'flex'} gap={1} alignItems={'end'} mt={1} color={'gray'}>
              <Typography display={'flex'} alignItems={'center'}><BedOutlinedIcon />Bed 5</Typography>
              <Typography display={'flex'} alignItems={'center'}><BathtubOutlinedIcon />Baths 5</Typography>
              <Typography display={'flex'} alignItems={'center'}><AspectRatioOutlinedIcon />1000 sq.ft</Typography>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'end'} alignItems={'end'} gap={1}>
            <IconButton sx={{ border: "1px solid", color: "#c2c2c2", borderRadius: "10px" }}>
              <IosShareOutlined />
            </IconButton>
            <Typography color='orange' variant='h4'> Kes 1000000</Typography>
          </Box>

        </Stack>

        <Stack display={'flex'} flexDirection={'row'} gap={3}>
          <Box display={'flex'} flexDirection={'column'}>
            <img style={{ margin: "2rem 0rem", borderRadius: "0.5rem" }} src={'https://eastmls-media.s3.us-east-2.amazonaws.com/6858fd3eb1f932ffcdda32e4/properties/68755e5ded97ed8b3feb74e8/images/IMG_0607.jpeg'} alt="" />

            <Box gap={2}>
              <Overview />
              <Propertydetails />
            </Box>
          </Box>
          <SellerEnquiry />
        </Stack>
      </Box>
    </>
  )
}

export default page
