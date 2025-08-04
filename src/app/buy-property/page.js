'use client'
import PropertyListingCard from '@/components/PropertyListingCard'
import { Button, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import decodeToken from '@/utils/decodeToken'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/components/loading'

function page() {
  const router = useRouter();
  const [type, settype] = useState('Property type')
  const [prop, setprop] = useState();
  const [isLoading, setLoading] = useState(true);


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



  return (
    <>
      {
        isLoading ? <LoadingComponent /> : (
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
    </>
  )
}

export default page
