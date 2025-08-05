'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import LoadingComponent from "@/components/loading";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import { DeleteOutlineOutlined, EditCalendarOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { api } from '@/utils/api';
import decodeToken from '@/utils/decodeToken';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function BasicTable() {

  const [prop, setprop] = useState();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const tokenRes = decodeToken("agent", router);

    const fetchAgentProperty = async () => {
      try {
        const response = await api.get('/property/agent')
        console.log(response.data);
        setprop(response.data.allprop)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    tokenRes?.status && fetchAgentProperty();
  }, [])

  const deleteproperty = async (id) => {
    const response = await api.delete(`/property/${id}`)
    console.log(response.data);
  }


  return (
    <>
      {isLoading ? <LoadingComponent /> : <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Details</TableCell>
              <TableCell align="right">Inquiries</TableCell>
              <TableCell align="right">Verification</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {prop?.map((row, index) => (
              <TableRow
                key={index}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.bedrooms}Bd - {row.bathrooms}B - {row.areaSqFt}Sq. Ft.</TableCell>
                <TableCell align="right">{row.viewCount}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="fingerprint" color="success">
                    <RemoveRedEyeOutlined sx={{ color: "orange" }} />
                  </IconButton>
                  <Link href={`/agent/property/edit/${row._id}`}>
                    <IconButton aria-label="fingerprint" color="success">
                      <EditCalendarOutlined sx={{ color: "orange" }} />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="fingerprint" color="success" onClick={() => deleteproperty(row._id)}>
                    <DeleteOutlineOutlined sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </>
  );
}
