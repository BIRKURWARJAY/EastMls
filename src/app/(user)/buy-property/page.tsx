'use client'
import PropertyListingCard from '../../../components/PropertyListingCard'
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { api } from '@/src/utils/api'
import LoadingComponent from '../../../components/Loading'
import toast from 'react-hot-toast'

function page() {
  const [type, settype] = useState('')
  const [keyword, setkeyword] = useState('')
  const [prop, setprop] = useState([])
  const [isLoading, setLoading] = useState<boolean>();
  const apiRef = useRef<boolean | null>(null);

  useEffect(() => {
    async function fetchProp() {
      apiRef.current = true;
      try {
        apiRef.current = true;
        setLoading(true)
        const response = await api.get(`/property/all`);
        setprop(response.data.allprop);
      } catch (error) {
        toast.error('Error in fetch property')
        apiRef.current = false;
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    !apiRef.current && fetchProp();
  }, [])
  console.log('>> component rerender', prop)

  const serachProp = async () => {
    try {
      console.log(type);

      const response = await api.get(`/property/search?propertyType=${type}&title=${keyword}`);
      console.log(response?.data?.propertydetails);
      if (response.status === 200) {
        setprop(response.data.propertydetails);
        toast.success(response.data.message)
      }

    } catch (error:any) {
      setprop([])
      toast.error(error?.response?.data?.message)
      console.error('Search error:', error);
    }
  }



  return (
    <>
      {isLoading ? <LoadingComponent /> : <Box boxShadow={"0px 1px 10px 1px #d6d6d6"} padding={2} display={'flex'} justifyContent={'center'} flexDirection={'column'}>

        <Stack minWidth={'80%'} flexDirection={{ xs: "column", sm: "row" }} justifyContent={'center'} alignItems={'center'} gap={3}>


          <TextField id="outlined-basic" value={keyword} placeholder="Enter keyword" variant="outlined" sx={{ width: "45%" }} onChange={(e) => setkeyword(e.target.value)} />

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
              <MenuItem value={'condo'}>condo</MenuItem>
              <MenuItem value={'villa'}>villa</MenuItem>
              <MenuItem value={'house'}>house</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" size='large' onClick={() => serachProp()} sx={{ backgroundColor: "orange", width: "10%", height: "100%" }} >Search</Button>
        </Stack>

        <Stack sx={{ mt: "3rem" }} padding={2}>
          <Typography variant='h6' fontSize={10}>There Are Currently {prop?.length} Results</Typography>
          {prop?.map((property, index) => (
            <PropertyListingCard prop={property} key={index} title={'Buy Property listing'} />
          ))}
        </Stack>
      </Box>}
    </>

  )
}


export default React.memo(page);
