import { LocationOn } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import React, { ReactNode } from 'react'
import Link from 'next/link';

type PropertyListingProps = {
  prop:{
    _id:string
    images:string[]
    title:string
    currency:string
    leaseType:string
    address:string
    price:number
    bedrooms:number
    bathrooms:number
    areaSqFt:number
  }
  title:string
}

function PropertyListingCard({ prop, title }:PropertyListingProps): ReactNode {



  return (
    <>
      <Typography variant='h4' fontWeight={750} fontSize={30}>{title}</Typography>

      <Stack justifyContent={'center'} gap={2} direction={'row'} alignItems={'start'} mt={8} flexWrap={'wrap'}>
        <Link href={`/property/${prop._id}`} className=' w-xl'>
          <Card variant='outlined' sx={{ position: "relative" }}  >

            <Button sx={{ position: "absolute", left: "0.5rem", top: "0.5rem", bgcolor: "orange", color: "white", fontSize: "8px", fontWeight: "600", width: "1px", padding: "5px" }} >For {prop?.leaseType}</Button>

            <CardMedia
              sx={{ borderRadius: "5px", height: "16rem" }}
              component="img"

              image={prop?.images[0]}
              alt="Paella dish"
            />

            <CardContent sx={{ paddingBottom: "1rem !important" }}>
              <Box flexDirection={'row'} display={'flex'} gap={0.5} color={'gray'} justifyContent={'space-between'} mb={1}>
                <Typography variant="h6" fontWeight={500} sx={{ color: 'text.primary' }}>
                  {prop?.title}
                </Typography>
                <Typography variant="h6" fontSize={10} fontWeight={600} sx={{ color: 'text.primary', textShadow: "0.5px 0.1px 0.5px gray" }}>
                  {prop?.currency?.toUpperCase()} {prop?.price}
                </Typography>
              </Box>
              <Box flexDirection={'row'} alignItems={'center'} display={'flex'} gap={0.5} color={'gray'}>
                <LocationOn></LocationOn>
                <Typography variant="body1" fontWeight={500} sx={{ color: 'text.secondary' }}>
                  {prop?.address}
                </Typography>
              </Box>
              <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2} flexWrap={'wrap'} display={'flex'} gap={0.5} color={'gray'}>
                <Box flexDirection={'row'} alignItems={'center'} display={'flex'} gap={0.5} color={'gray'}>
                  <BedIcon ></BedIcon>
                  <Typography>Bed {prop?.bedrooms}</Typography>
                </Box>
                <Box flexDirection={'row'} alignItems={'center'} display={'flex'} gap={0.5} color={'gray'}>
                  <BathtubIcon></BathtubIcon>
                  <Typography>Bath {prop?.bathrooms}</Typography>
                </Box>
                <Box flexDirection={'row'} alignItems={'center'} display={'flex'} gap={0.5} color={'gray'}>
                  <AspectRatioIcon></AspectRatioIcon>
                  <Typography>{prop?.areaSqFt} Sq. Ft.</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Link>
      </Stack>

    </>
  )
}

export default PropertyListingCard
