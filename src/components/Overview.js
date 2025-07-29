import { BathroomOutlined, SensorDoorOutlined } from '@mui/icons-material'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

function Overview({ prop }) {

    const temp = [
        {
            icon: <SensorDoorOutlined sx={{ fontSize: 40, p: 0.8, border: "1px solid #e5e5e5", borderRadius: "0.5rem" }} />,
            title: "Rooms",
            detail: 5
        },
        {
            icon: <BathroomOutlined sx={{ fontSize: 40, p: 0.8, border: "1px solid #e5e5e5", borderRadius: "0.5rem" }} />,
            title: "Baths",
            detail: 5
        },
        {
            icon: <BathroomOutlined sx={{ fontSize: 40, p: 0.8, border: "1px solid #e5e5e5", borderRadius: "0.5rem" }} />,
            title: "Baths",
            detail: 5
        },
        {
            icon: <BathroomOutlined sx={{ fontSize: 40, p: 0.8, border: "1px solid #e5e5e5", borderRadius: "0.5rem" }} />,
            title: "Baths",
            detail: 5
        },
        {
            icon: <BathroomOutlined sx={{ fontSize: 40, p: 0.8, border: "1px solid #e5e5e5", borderRadius: "0.5rem" }} />,
            title: "Baths",
            detail: 5
        },
        {
            icon: <BathroomOutlined sx={{ fontSize: 40, p: 0.8, border: "1px solid #e5e5e5", borderRadius: "0.5rem" }} />,
            title: "Baths",
            detail: 5
        },
        {
            icon: <BathroomOutlined sx={{ fontSize: 40, p: 0.8, border: "1px solid #e5e5e5", borderRadius: "0.5rem" }} />,
            title: "Baths",
            detail: 5
        },
    ]

    return (
        <>
            <Paper sx={{ padding: "2rem 1rem" }}>
                <Typography variant='h6' fontWeight={600} borderBottom={'1px solid #e5e5e5'} mb={2} pb={1}>Overview</Typography>
                <Grid container  columnGap={0}>
                    {temp?.map((data, index) =>
                        <Grid size={{ xs: 12, sm: 3 }} alignItems={'center'} key={index}>
                            <Box display={'flex'} gap={1.5}>
                                {data.icon}
                                <Box>
                                    <Typography variant='body1'>{data.title}</Typography>
                                    <Typography fontWeight={700} variant='body1'>{data.detail}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </>
    )
}

export default Overview
