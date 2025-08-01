'use client'
import PropertyListingCard from '@/components/PropertyListingCard'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function page() {

  const [type, settype] = useState('Property type')
  const [prop, setprop] = useState()

  useEffect(() => {
    const fetchProp = async () => {
      const response = await axios.get(`http://localhost:5000/property/all`)
      console.log(response.data);
      setprop(response.data.allprop)
    }
    fetchProp()

  }, [])


  return (
    <>
      <Stack direction={"row"} boxShadow={"0px 1px 10px 1px #d6d6d6"} padding={2} gap={3}>


        <TextField id="outlined-basic" placeholder="Enter keyword" variant="outlined" sx={{ width: "45%" }} />

        <FormControl sx={{ width: '45%' }}>
          <Select
            labelId="Property type"
            id="demo-simple-select-helper"
            value={type}

            onChange={(e) => settype(e.target.value)}
          >

            <MenuItem disabled value={'Property type'}>Property type</MenuItem>
            <MenuItem value={'villa'}>villa</MenuItem>
            <MenuItem value={'home'}>home</MenuItem>
            <MenuItem value={'flat'}>flat</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ backgroundColor: "orange", width: "10%" }} >Search</Button>
      </Stack>

      <Stack sx={{ mt: "3rem" }} padding={2}>
        <PropertyListingCard data={prop} title={'Buy Property listing'} />
      </Stack>
    </>
  )
}

export default page
