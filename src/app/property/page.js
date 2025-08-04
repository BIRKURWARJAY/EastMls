"use client"

import PropertyListingCard from '@/components/PropertyListingCard'
import { api } from '@/utils/api'
import decodeToken from '@/utils/decodeToken'
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/components/loading'

function page() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [value, setvalue] = useState([])
  const [prop, setprop] = useState()
  const [type, settype] = useState('Property type')
  const [keyword, setkeyword] = useState('')



  useEffect(() => {
        const tokenRes = decodeToken("user", router);

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
    tokenRes && fetchprop()

  }, [])
  useEffect(() => {
    try {
      const fetchprop = async () => {
        const response = await api.get(`/property/all`)
        console.log(response.data);
        setprop(response.data.allprop)
      }
      fetchprop()
    } catch (error) {
      console.log(error);

    }
  }, [])
  // console.log(value);

  const serachProp = async () => {
    try {
      console.log(type);

      const response = await api.get(`/property/search?propertyType=${type}&title=${keyword}&leaseType=${value}`);
      console.log(response.data.propertydetails);
      setprop(response.data.propertydetails);
    } catch (error) {
      console.error('Search error:', error);
    }
  }


  return (
    <>
      {
        isLoading ? <LoadingComponent /> : <>
          <Stack flexDirection={'row'} display={'flex'} justifyContent={'center'} flexWrap={'wrap'} boxShadow={"0px 1px 10px 1px #d6d6d6"} py={4} gap={2}>
            <ToggleButtonGroup

              value={value}
              onChange={(e, newvalue) => setvalue(newvalue)}

              sx={{ gap: "1rem", width: "15rem" }}>
              <ToggleButton value={"rent"} sx={{ backgroundColor: "rgb(255 245 230)", borderRadius: "0rem", width: "50%" }} size='large'>
                <Typography fontSize={12} fontWeight={600} color='black'>For Rent</Typography>
              </ToggleButton >
              <ToggleButton value={"sale"} sx={{ backgroundColor: "rgb(255 245 230)", borderRadius: "0rem", width: "50%" }} size='large'>
                <Typography fontSize={12} fontWeight={600} color='black'>For Sale</Typography>
              </ToggleButton >
            </ToggleButtonGroup>
            <Box width={'60%'} display={'flex'} flexWrap={'nowrap'} minWidth={'5rem'} gap={2}>


            <TextField id="outlined-basic" placeholder="Enter keyword" variant="outlined" sx={{ width: "50%", minWidth: "100px" }} />
            <TextField value={keyword} onChange={(e) => setkeyword(e.target.value)} id="outlined-basic" placeholder="Enter keyword" variant="outlined" sx={{ width: "50%", minWidth: "200px", }} />


            <FormControl sx={{ width: "50%", minWidth: "200px" }}>
              <Select
                labelId="Property type"
                id="demo-simple-select-helper"
                value={type}
                onChange={(e) => settype(e.target.value)}
              >

                <MenuItem value={'Property type'}>Property type</MenuItem>
                <MenuItem value={'villa'}>villa</MenuItem>
                <MenuItem value={'home'}>home</MenuItem>
                <MenuItem value={'flat'}>flat</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: "orange", width: "3rem" }} >Search</Button>
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
