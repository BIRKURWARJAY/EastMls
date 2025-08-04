'use client'
import useEastmlsStore from '@/store/eastmlsStore'
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'

function page() {
  const router = useRouter();

  const [inquries, setinquries] = useState();
  const [loading, setLoading] = useState(true);
  const token = useEastmlsStore(s => s.token);
  const isLoading = useEastmlsStore(s => s.isLoading);

  useEffect(() => {


    if (isLoading) {
      console.log("Store is still loading, waiting...");
      return;
    }

    console.log("Token in my-inquiries:", token, Date.now());
    
    if (!token) {
      console.log("No token found, redirecting to login");
      router.push("/login");
      return;
    }

    try {
      const decode = jwtDecode(token);
      if (!decode) {
        console.log("token not found or invalid");
        router.push("/login");
        return;
      }
      if (decode.role !== "agent") {
        console.log("not allowed");
        router.back();
        return;
      }
      
      const getinq = async () => {
        try {
          const response = await api.get('/inquiry', { 
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true 
          });
          console.log(response.data);
          setinquries(response.data.allInq);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      getinq();
    } catch (error) {
      console.log("Error decoding token:", error);
      router.push("/login");
    }

  }, [token, isLoading, router]);

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
        !loading && <Stack p={{ xs: "1rem", md: "2rem" }} mt={2}>
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
