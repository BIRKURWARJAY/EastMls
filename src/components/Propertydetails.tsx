import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

type PropertyDetailsProps = {
  data: {
    currency: string
    price: number
    areaSqFt: number
    bedrooms: number
    bathrooms: number
    garage: number        
    yearOfBuild: number
    landArea?: number     
  }
}


function Propertydetails({ data }: PropertyDetailsProps) {

    const temp = {
        price: `${data?.currency, data?.price}`,
        size: `${data?.areaSqFt} Sq. Ft.`,
        rooms: data?.bedrooms,
        bath: data?.bathrooms,
        'garage size': data?.garage,
        Year: data?.yearOfBuild,
        Land: data?.landArea,
    }

    return (
        <>
            <Paper sx={{ padding: "2rem 1rem", marginTop: "1rem" }}>
                <Typography variant='h6' fontWeight={550} borderBottom={'1px solid #e5e5e5'} mb={2} pb={1}>Property details</Typography>
                <Grid container columnGap={15} display={'flex'} >
                    {
                        Object.entries(temp).map(([key, value]) => (
                            < Grid key={key} size={{ xs: 12, sm: 6 }} display={"flex"} justifyContent={"space-between"} sx={{ maxWidth: "30%" }} >

                                <Typography fontWeight={600}>{key}</Typography>
                                <Typography textAlign={'left'} width={100}>{value}</Typography>
                            </Grid>
                        ))
                    }

                </Grid>
            </Paper >
        </>
    )
}

export default Propertydetails
