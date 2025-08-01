'use client'
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function page() {

    const [inquries, setinquries] = useState()

    useEffect(() => {
        const getinq = async () => {
            try {
                const response = await axios.get('http://localhost:5000/inquiry', { withCredentials: true })
                console.log(response.data);
                setinquries(response.data.allInq)

            } catch (error) {
                console.log(error);

            }
        }
        getinq()

    }, [])


    return (
        <>
            <Stack p={{ xs: "1rem", md: "2rem" }} mt={2}>
                <Typography variant='h3' fontWeight={600}>My Inquiries</Typography>
                <Typography variant='body1' >There Are Currently {inquries?.length} Results</Typography>

                <TableContainer sx={{ mt: "5rem", border: "1px solid #dbdbdb", borderRadius: "10px" }}>
                    <Table sx={''} aria-label="customized table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: "rgb(249 250 251)", }}>
                                <TableCell sx={{ fontSize: "13px", fontWeight: "500", color: "rgb(107 114 128)", width: "10%" }} align='left'>AGENT NAME</TableCell>
                                <TableCell sx={{ fontSize: "13px", fontWeight: "500", color: "rgb(107 114 128)", width: "20%" }} align="left">PROPERTY NAME</TableCell>
                                <TableCell sx={{ fontSize: "13px", fontWeight: "500", color: "rgb(107 114 128)", width: "50%" }} align="left">MESSAGE</TableCell>
                                <TableCell sx={{ fontSize: "13px", fontWeight: "500", color: "rgb(107 114 128)", width: "10%" }} align="left">STATUS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inquries?.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.propertyId.title}</TableCell>
                                    <TableCell align="left">{row.message}</TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Stack>
        </>
    )
}

export default page
