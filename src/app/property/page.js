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

              <FormControl sx={{ width: "50%", minWidth: "100px" }}>
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
