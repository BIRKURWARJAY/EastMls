"use client"

import PropertyListingCard from '@/src/components/PropertyListingCard'
import { api } from '@/src/utils/api'
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import LoadingComponent from '@/src/components/Loading'

function page() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [value, setvalue] = useState<any[]>([])
  const [prop, setprop] = useState<any[]>([])
  const [type, settype] = useState<string>('')
  const [keyword, setkeyword] = useState<string>('')
  const apiRef = useRef<boolean>(false);



  useEffect(() => {

    const fetchprop = async () => {
      try {
        apiRef.current = true;
        const response = await api.get(`/property/all`)
        console.log(response.data);
        if (response?.status === 200) {
          setprop(response.data.allprop)
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        apiRef.current = false;
        setLoading(false);
      }
    }

    !apiRef.current && fetchprop();
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

    } catch (error:any) {
      setprop([])
      toast.error(error.response.data.message)
      console.error('Search error:', error);
    }
  }


  return (
    <>
      {isLoading ? <LoadingComponent /> : <>
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
            <ToggleButton value={"sell"} sx={{ borderLeft: "1px solid #dbdbdb !important", borderRadius: "1rem !important" }} size='large'>
              <Typography sx={{ textWrap: "nowrap" }} fontSize={12} fontWeight={600} >For Sell</Typography>
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
                <MenuItem value={'condo'}>condo</MenuItem>
                <MenuItem value={'house'}>house</MenuItem>
                <MenuItem value={'flat'}>flat</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" sx={{ backgroundColor: "orange", width: "3rem" }} onClick={() => serachProp()}>Search</Button>
        </Stack>

        <Stack sx={{ mt: "3rem" }} padding={2}>
          <Typography variant='h6' fontSize={10}>There Are Currently {prop?.length} Results</Typography>
          {prop?.map((property, index) => (
            <PropertyListingCard prop={property} key={index} title={'Buy Property listing'} />
          ))}
        </Stack>
      </>
      }
    </>
  )
}

export default page
