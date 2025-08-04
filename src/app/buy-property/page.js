'use client'
import PropertyListingCard from '@/components/PropertyListingCard'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import axios from 'axios'
import decodeToken from '@/utils/decodeToken'
import { useRouter } from 'next/navigation'

function page() {
  const [type, settype] = useState('')
  const [keyword, setkeyword] = useState('')
  const [prop, setprop] = useState()

  const router = useRouter()

  
  
  useEffect(() => {
    const tok = decodeToken("user");
    if (tok.role === 'user') {
      console.log("from code",tok.role);
      router.push('/')
    }
    const fetchProp = async () => {
      const response = await api.get(`/property/all`)
      console.log(response.data, "hello");
      setprop(response.data.allprop)
    }
    fetchProp()
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
      <Box boxShadow={"0px 1px 10px 1px #d6d6d6"} padding={2} display={'flex'} justifyContent={'center'}>

        <Stack minWidth={'80%'} flexDirection={{ xs: "column", sm: "row" }} justifyContent={'center'} alignItems={'center'} gap={3}>


          <TextField id="outlined-basic" value={keyword} onChange={(e) => setkeyword(e.target.value)} placeholder="Enter keyword" variant="outlined" sx={{ width: "45%", minWidth: "200px" }} />

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
