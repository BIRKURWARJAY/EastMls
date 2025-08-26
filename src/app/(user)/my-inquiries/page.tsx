'use client'
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { api } from '../../../utils/api'
import LoadingComponent from '../../../components/Loading'


function page() {
  const [inquries, setinquries] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const apiRef = useRef(false);


  useEffect(() => {
    const getinq = async () => {
      try {
        apiRef.current = true;
        const response = await api.get('/inquiry');
        setinquries(response.data.allInq);
        setLoading(false);
      } catch (error) {
        console.log(error);
        apiRef.current = false;
        setLoading(false);
      }
    }
    !apiRef.current && getinq();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {isLoading ? <LoadingComponent /> :
        <Stack p={{ xs: "1rem", md: "2rem" }} mt={2}>
          <Typography variant='h3' fontWeight={600}>My Inquiries</Typography>
          <Typography variant='body1' >There Are Currently {inquries?.length} Results</Typography>

          <TableContainer sx={{ mt: "5rem", border: "1px solid #dbdbdb", borderRadius: "10px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow sx={{ bgcolor: "rgb(249 250 251)", }}>
                  <TableCell sx={{ fontSize: "13px", fontWeight: "500", color: "rgb(107 114 128)", width: "10%" }} align='left'>AGENT NAME</TableCell>
                  <TableCell sx={{ fontSize: "13px", fontWeight: "500", color: "rgb(107 114 128)", width: "20%" }} align="left">PROPERTY NAME</TableCell>
                  <TableCell sx={{ fontSize: "13px", fontWeight: "500", color: "rgb(107 114 128)", width: "50%" }} align="left">MESSAGE</TableCell>
                  <TableCell sx={{ fontSize: "13px", fontWeight: "500", color: "rgb(107 114 128)", width: "10%" }} align="left">STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inquries?.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.propertyId?.title}</TableCell>
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
