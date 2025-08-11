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
import { Box, IconButton } from '@mui/material';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import decodeRole from '@/utils/decodeRole';
import { eastMlsStore } from '@/store/eastMlsStore';


export default function BasicTable() {

  const [prop, setprop] = useState();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
    const role = eastMlsStore(s => s.role);
  

  useEffect(() => {
    async function validate() {
      const tokenRes = decodeRole("agent", router);

      const fetchAgentProperty = async () => {
        try {
          const response = await api.get('/property/agent')
          if (response.status === 200) {
            setprop(response?.data.allprop)
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }

      tokenRes ? fetchAgentProperty() : router.push("/login");
    }
    validate();
  }, [])

  const deleteproperty = async (id) => {
    const response = await api.delete(`/property/${id}`)
    console.log(response.data);
    if (response.status === 200) {
      toast.success(response.data.message)
      setprop((prevProps) => prevProps.filter((property) => property._id !== id));
    }
  }


  return (
    <>
      {isLoading ? <LoadingComponent /> : <Box display={'flex'} justifyContent={'center'} p={'2rem'}>

        <TableContainer component={Paper} sx={{ maxWidth: "90rem" }}>
          <Table sx={{ minWidth: 650, }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Details</TableCell>
                <TableCell align="left">Inquiries</TableCell>
                <TableCell align="left">Verification</TableCell>
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
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.bedrooms}Bd - {row.bathrooms}B - {row.areaSqFt}Sq. Ft.</TableCell>
                  <TableCell align="left">{row.viewCount}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="right">
                    <Link href={`/property/${row?.title}/${row?._id}`}>
                      <IconButton aria-label="fingerprint" color="success" >
                        <RemoveRedEyeOutlined sx={{ color: "orange" }} />
                      </IconButton>
                    </Link>
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

      </Box>
      }
    </>
  );
}
