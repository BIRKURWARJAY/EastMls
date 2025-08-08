'use client'
import PropertyListingCard from '@/components/PropertyListingCard'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import decodeToken from '@/utils/decodeToken'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/components/loading'
import toast from 'react-hot-toast'

function page() {
  const [type, settype] = useState('')
  const [keyword, setkeyword] = useState('')
  const [prop, setprop] = useState()
  const [isLoading, setLoading] = useState(true);

  const router = useRouter()

  useEffect(() => {
    async function fetchProp() {
      const tokenRes = await decodeToken("user", router);
      const fetchProp = async () => {
        try {
          const response = await api.get(`/property/all`)
          // console.log(response.data, "hello");
          setprop(response.data.allprop);
          setLoading(false);
        } catch (error) {
          toast.error('Error in fetch property')
          console.log(error);
          setLoading(false)
        }
      }
      tokenRes?.status ? fetchProp() : router.push("/login");
    }
    fetchProp();
  }, [])


  const serachProp = async () => {
    try {
      console.log(type);

      const response = await api.get(`/property/search?propertyType=${type}&title=${keyword}`);
      console.log(response);
      if (response.status === 200) {
        setprop(response.data.propertydetails);
        toast.success(response.data.message)
      }

    } catch (error) {
      setprop([])
      toast.error(error.response?.data?.message)
      console.error('Search error:', error);
    }
  }



  return (
    <>
      {isLoading ? <LoadingComponent /> : <Box boxShadow={"0px 1px 10px 1px #d6d6d6"} padding={2} display={'flex'} justifyContent={'center'} flexDirection={'column'}>

        <Stack minWidth={'80%'} flexDirection={{ xs: "column", sm: "row" }} justifyContent={'center'} alignItems={'center'} gap={3}>


          <TextField id="outlined-basic" placeholder="Enter keyword" variant="outlined" sx={{ width: "45%" }} />

          <FormControl sx={{ width: '45%', minWidth: "200px" }}>
            <Select
              labelId="Property type"
              id="demo-simple-select-helper"
              value={type}

              onChange={(e) => settype(e.target.value)}
            >

              <MenuItem disabled value={'Property type'}>Property type</MenuItem>
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'flat'}>flat</MenuItem>
              <MenuItem value={'villa'}>villa</MenuItem>
              <MenuItem value={'house'}>house</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" size='large' onClick={() => serachProp()} sx={{ backgroundColor: "orange", width: "10%", height: "100%" }} >Search</Button>
        </Stack>

        <Stack sx={{ mt: "3rem" }} padding={2}>
          <PropertyListingCard data={prop} title={'Buy Property listing'} />
        </Stack>
      </Box>}
    </>

  )
}


export default page;
