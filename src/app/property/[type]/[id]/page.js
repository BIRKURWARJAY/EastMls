"use client"
import BreadCrumbs from '@/components/BreadCrumbs';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import { IosShareOutlined } from '@mui/icons-material';
import Overview from '@/components/Overview';
import Propertydetails from '@/components/Propertydetails';
import SellerEnquiry from '@/components/SellerEnquiry';
import { api } from '@/utils/api';
import decodeToken from '@/utils/decodeToken';
import LoadingComponent from '@/components/loading';

function page() {
  const router = useRouter();
  const params = useParams()
  const [isLoading, setLoading] = useState(true);

  const [prop, setprop] = useState()

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" >
      East mls
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/buy-property"

    >
      property
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      villa
    </Typography>,
  ];


  useEffect(() => {
    async function validate() {
      const tokenRes = await decodeToken(["user", "agent"], router);

    const fetchprop = async () => {
      try {
        const response = await api.get(`/property/${params.id}`)
        console.log(response.data);
        setprop(response.data.propertydetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
      tokenRes?.status ? fetchprop() : router.push("/login");
    }
    validate();
  }, [])

  return (
    <>
      {isLoading ? <LoadingComponent /> : <Box px={6} gap={10} pt={7}>

        <BreadCrumbs array={breadcrumbs} />

        <Stack mt={5} display={'flex'} direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'}>

          <Box>
            <Typography variant='h4' fontWeight={600}>{prop?.title}</Typography>
            <Box display={'flex'} gap={1} alignItems={'center'} mt={2}>
              <Typography variant='body2' borderRadius={1} fontWeight={300} bgcolor={'orange'} color='white' p={0.5}>For sale</Typography>
              <Typography><MapOutlinedIcon />{prop?.address}</Typography>
              <Typography><DateRangeOutlinedIcon />{prop?.yearOfBuild}</Typography>
            </Box>
            <Box display={'flex'} gap={1} alignItems={'end'} mt={1} color={'gray'}>
              <Typography display={'flex'} alignItems={'center'}><BedOutlinedIcon />Bed {prop?.bedrooms}</Typography>
              <Typography display={'flex'} alignItems={'center'}><BathtubOutlinedIcon />Baths {prop?.bathrooms}</Typography>
              <Typography display={'flex'} alignItems={'center'}><AspectRatioOutlinedIcon /> {prop?.areaSqFt} Sq. Ft.</Typography>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} justifyContent={'end'} alignItems={'end'} gap={1} >
            <IconButton sx={{ border: "1px solid", color: "#c2c2c2", borderRadius: "10px" }}>
              <IosShareOutlined />
            </IconButton>
            <Typography color='orange' variant='h4'> {prop?.currency.toUpperCase()} {prop?.price}</Typography>
          </Box>

        </Stack>

        <Stack display={'flex'} justifyContent={'space-evenly'} flexDirection={'row'} gap={3} mt={3} flexWrap={{ xs: "wrap", xl: "nowrap" }}>
          <Box display={'flex'} flexDirection={'column'} gap={3} mb={3}>
            <img width={'100%'} style={{ borderRadius: "0.5rem" }} src={prop?.images[0]} alt="" />

            <Box gap={2}>
              <Overview data={prop} />

              <Propertydetails data={prop} />
            </Box>
          </Box>
          <SellerEnquiry data={prop} />
        </Stack>
      </Box>}
    </>
  )
}

export default page
