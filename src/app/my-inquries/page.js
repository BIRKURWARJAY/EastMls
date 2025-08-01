import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { jwtDecode } from "jwt-decode";

function page() {
  const decode = jwtDecode()

    const temp = [
        {
            name:"huseen ali",
            property_name:"villa in kimani",
            message:"hello agent",
            status:"read",
        },
        {
            name:"huseen ali 2",
            property_name:"villa in gandhinagar",
            message:"hello agent2",
            status:"delivered",
        },
        {
            name:"huseen ali 3",
            property_name:"villa in ahmedabad",
            message:"hello agent3",
            status:"delivered",
        },
       
    ]

    return (
        <>
            <Stack p={5} mt={2}>
                <Typography variant='h3' fontWeight={600}>My Inquiries</Typography>
                <Typography variant='body1' >There Are Currently 1 Results</Typography>

                <TableContainer  sx={{mt:"5rem", border:"1px solid #dbdbdb", borderRadius:"10px"}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow sx={{bgcolor:"rgb(249 250 251)", }}>
                                <TableCell sx={{fontSize:"13px", fontWeight:"500", color:"rgb(107 114 128)"}} align='left'>AGENT NAME</TableCell>
                                <TableCell sx={{fontSize:"13px", fontWeight:"500", color:"rgb(107 114 128)"}} align="left">PROPERTY NAME</TableCell>
                                <TableCell sx={{fontSize:"13px", fontWeight:"500", color:"rgb(107 114 128)"}} align="left">MESSAGE</TableCell>
                                <TableCell sx={{fontSize:"13px", fontWeight:"500", color:"rgb(107 114 128)"}} align="left">STATUS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {temp.map((row,index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.property_name}</TableCell>
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
