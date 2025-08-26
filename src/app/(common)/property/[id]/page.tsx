"use client"
import BreadCrumbs from '@/src/components/BreadCrumbs';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import { IosShareOutlined } from '@mui/icons-material';
import Overview from '@/src/components/Overview';
import Propertydetails from '@/src/components/Propertydetails';
import SellerEnquiry from '@/src/components/SellerEnquiry';
import { api } from '@/src/utils/api';
import LoadingComponent from '@/src/components/Loading';


type propertyProps = {
  title: string
  address: string
  currency: string
  price: number
  yearOfBuild: number
  bedrooms: number
  bathrooms: number
  areaSqFt: number
  images?: any
  propertyType: string
  garage: number
  garageSize: number
  _id: string
  agentId: {
    username: string
    email: string
  }
}


function page(): ReactNode {
  const params = useParams()
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(true);

  const [prop, setprop] = useState<propertyProps | undefined | null>()
  const apiRef = useRef<boolean>(false);


  const breadcrumbs = [
    <Link key="1" color="inherit" href="/" >
      East mls
    </Link>,
    <Link

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

    const fetchprop = async (): Promise<void> => {
      try {
        apiRef.current = true;
        const response: Axios.AxiosXHR<any> = await api.get(`/property/${params.id}`)
        console.log(response.data);
        setprop(response.data.propertydetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
        apiRef.current = false;
        setLoading(false);
      }
    }

    !apiRef.current && fetchprop();

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
              <Overview data={prop!} />

              <Propertydetails data={prop!} />
            </Box>
          </Box>
          <SellerEnquiry data={prop!} />
        </Stack>
      </Box>}
    </>
  )
}

export default page
