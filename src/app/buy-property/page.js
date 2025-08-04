'use client'
import PropertyListingCard from '@/components/PropertyListingCard'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import axios from 'axios'
import decodeToken from '@/utils/decodeToken'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/components/loading'

function page() {
  const [type, settype] = useState('')
  const [keyword, setkeyword] = useState('')
  const [prop, setprop] = useState()

  const router = useRouter()

  
  
  useEffect(() => {
    const tokenRes = decodeToken("user", router);
    const fetchProp = async () => {
      try {
        const response = await api.get(`/property/all`)
        console.log(response.data);
        setprop(response.data.allprop)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    tokenRes && fetchProp();
  }, [])

  const changeHandler = (e) => {
    console.log(">> change >", e)
    settype(e.target.value)
  }

  const serachProp = async () => {
    try {
      console.log(type);

      const response = await api.get(`/property/search?propertyType=${type}&title=${keyword}`);
      console.log(response.data.propertydetails);
      setprop(response.data.propertydetails);
    } catch (error) {
      console.error('Search error:', error);
    }
  }



  return (
    <>
      {
        isLoading ? <LoadingComponent /> : (
          <>
          <Stack direction={"row"} boxShadow={"0px 1px 10px 1px #d6d6d6"} padding={2} gap={3}>


            <TextField id="outlined-basic" placeholder="Enter keyword" variant="outlined" sx={{ width: "45%" }} />

          <FormControl sx={{ width: '45%', minWidth: "200px" }}>
            <Select
              labelId="Property type"
              id="demo-simple-select-helper"
              value={type}

              onChange={changeHandler}
            >

              <MenuItem disabled value={'Property type'}>Property type</MenuItem>
              <MenuItem value={'flat'}>flat</MenuItem>
              <MenuItem value={'villa'}>villa</MenuItem>
              <MenuItem value={'house'}>house</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" size='large' onClick={() => serachProp()} sx={{ backgroundColor: "orange", width: "10%", height: "100%" }} >Search</Button>
        </Stack>

      </Box>
      <Stack sx={{ mt: "3rem" }} padding={2}>
        <PropertyListingCard data={prop} title={'Buy Property listing'} />
      </Stack>
    </>
  )
}

export default page
