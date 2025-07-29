import { Image, LocationOn } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import React from 'react'
import Link from 'next/link';

function PropertyListingCard({ data, title }) {

    // console.log(data);


    return (
        <>
            <Typography variant='h4' fontWeight={750} fontSize={30}>{title}</Typography>
            <Typography variant='h6' fontSize={10}>There Are Currently 1 Results</Typography>

            <Stack justifyContent={'start'} gap={2} direction={'row'} alignItems={'start'} mt={6} >
                {data && data.map((prop) =>
                    <Link href={`/property/${prop.name.replaceAll(' ','_')}/${prop.id}`} key={prop.id}>
                        <Card  variant='outlined' sx={{ width: "32rem", position: "relative" }}  >

                            <Button sx={{ position: "absolute", left: "0.5rem", top: "0.5rem", bgcolor: "orange", color: "white", fontSize: "8px", fontWeight: "600", width: "1px", padding: "5px" }} >For sale</Button>

                            <CardMedia
                                sx={{ borderRadius: "5px", height: "16rem" }}
                                component="img"

                                image={prop.image}
                                alt="Paella dish"
                            />

                            <CardContent sx={{ paddingBottom: "1rem !important" }}>
                                <Box flexDirection={'row'} display={'flex'} gap={0.5} color={'gray'} justifyContent={'space-between'}>
                                    <Typography variant="body1" fontWeight={500} sx={{ color: 'text.primary' }}>
                                        {prop.name}
                                    </Typography>
                                    <Typography variant="h6" fontSize={10} fontWeight={600} sx={{ color: 'text.primary', textShadow: "1px 1px 0.5px gray" }}>
                                        KES {prop.price}
                                    </Typography>
                                </Box>
                                <Box flexDirection={'row'} alignItems={'center'} display={'flex'} gap={0.5} color={'gray'}>
                                    <LocationOn></LocationOn>
                                    <Typography variant="body1" fontWeight={500} sx={{ color: 'text.secondary' }}>
                                        {prop.location}
                                    </Typography>
                                </Box>
                                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2} display={'flex'} gap={0.5} color={'gray'}>
                                    <Box flexDirection={'row'} alignItems={'center'} display={'flex'} gap={0.5} color={'gray'}>
                                        <BedIcon ></BedIcon>
                                        <Typography>Bed 5</Typography>
                                    </Box>
                                    <Box flexDirection={'row'} alignItems={'center'} display={'flex'} gap={0.5} color={'gray'}>
                                        <BathtubIcon></BathtubIcon>
                                        <Typography>Bed 5</Typography>
                                    </Box>
                                    <Box flexDirection={'row'} alignItems={'center'} display={'flex'} gap={0.5} color={'gray'}>
                                        <AspectRatioIcon></AspectRatioIcon>
                                        <Typography>Bed 5</Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Link>
                )}
            </Stack>

        </>
    )
}

export default PropertyListingCard
