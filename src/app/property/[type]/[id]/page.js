"use client"
import BreadCrumbs from '@/components/BreadCrumbs';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';

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
      <Box pl={6} gap={10} pt={7}>

        <BreadCrumbs array={breadcrumbs} />

        <Stack mt={5}>
          <Typography variant='h4' fontWeight={600}>Villa In Kilimani</Typography>

          <Box>
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

          <img style={{ margin: "2rem 0rem", borderRadius: "0.5rem" }} width={600} src={'https://eastmls-media.s3.us-east-2.amazonaws.com/6858fd3eb1f932ffcdda32e4/properties/68755e5ded97ed8b3feb74e8/images/IMG_0607.jpeg'} alt="" />
        </Stack>
      </Box>
    </>
  )
}

export default page
