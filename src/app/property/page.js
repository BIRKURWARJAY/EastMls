"use client"

import PropertyListingCard from '@/components/PropertyListingCard'
import { api } from '@/utils/api'
import decodeToken from '@/utils/decodeToken'
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function page() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [value, setvalue] = useState([])
  const [prop, setprop] = useState()
  const [type, settype] = useState('')
  const [keyword, setkeyword] = useState('')



  useEffect(() => {
    async function validate() {
      const tokenRes = await decodeToken("user", router);

    const fetchprop = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/property/all`)
        console.log(response.data);
        setprop(response.data.allprop)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
      tokenRes?.status ? fetchprop() : router.push("/login");
    }
    validate();
  }, [])


  const serachProp = async () => {
    try {
      console.log(type);

      const response = await api.get(`/property/search?propertyType=${type}&title=${keyword}&leaseType=${value}`);
      console.log(response.data.propertydetails);
      if (response.status === 200) {
        setprop(response?.data?.propertydetails);
        toast.success(response.data.message)
      }

    } catch (error) {
      setprop([])
      toast.error(error.response.data.message)
      console.error('Search error:', error);
    }
  }


  return (
    <>
      {!isLoading && <>
        <Stack flexDirection={{ xs: "column", sm: "row" }} display={'flex'} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} boxShadow={"0px 1px 10px 1px #d6d6d6"} py={2} gap={2}>
          <ToggleButtonGroup
            sx={{
              gap: '0.5rem',
              width: '15rem',
            }}
            value={value}
            color='info'
            onChange={(e, newvalue) => setvalue(newvalue)}
          >
            <ToggleButton value={"rent"} sx={{ borderRadius: "1rem !important" }} size='medium'>
              <Typography sx={{ textWrap: "nowrap" }} fontSize={12} fontWeight={600} >For Rent</Typography>
            </ToggleButton >
            <ToggleButton value={"sale"} sx={{ borderLeft: "1px solid #dbdbdb !important", borderRadius: "1rem !important" }} size='large'>
              <Typography sx={{ textWrap: "nowrap" }} fontSize={12} fontWeight={600} >For Sale</Typography>
            </ToggleButton >
          </ToggleButtonGroup>
          <Box width={'60%'} flexDirection={{ xs: "column", sm: "row" }} display={'flex'} justifyContent={'center'} alignItems={'center'} flexWrap={'nowrap'} gap={2}>


            <TextField value={keyword} onChange={(e) => setkeyword(e.target.value)} id="outlined-basic" placeholder="Enter keyword" variant="outlined" sx={{ width: "50%", minWidth: "200px", }} />


            <FormControl sx={{ width: "50%", minWidth: "200px" }}>
              <Select
                labelId="Property type"
                id="demo-simple-select-helper"
                value={type}
                onChange={(e) => settype(e.target.value)}
              >

                <MenuItem disabled value={'Property type'}>Property type</MenuItem>
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={'villa'}>villa</MenuItem>
                <MenuItem value={'house'}>house</MenuItem>
                <MenuItem value={'flat'}>flat</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: "orange", width: "3rem" }} onClick={() => serachProp()}>Search</Button>
        </Stack>

        <Stack sx={{ mt: "3rem" }} padding={2}>
          <PropertyListingCard data={prop} title={'Property listing'} />
        </Stack>
      </>
      }
    </>
  )
}

export default page
