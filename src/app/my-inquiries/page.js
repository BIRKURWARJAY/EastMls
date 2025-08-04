'use client'
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import decodeToken from '@/utils/decodeToken'
import { useRouter } from 'next/navigation'

function page() {
  const router = useRouter();
  const [inquries, setinquries] = useState();
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const getinq = async () => {
      try {
        setLoading(true);
        decodeToken("user", setLoading, router);
        const response = await api.get('/inquiry');
        console.log(response.data);
        setinquries(response.data.allInq);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getinq();
  }, []);

  // Show loading spinner while store is initializing
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {
        !isLoading && <Stack p={{ xs: "1rem", md: "2rem" }} mt={2}>
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
      }
    </>
  )
}

export default page
