'use client'
import PropertyListingCard from '@/components/PropertyListingCard'
<<<<<<< HEAD
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material'
=======
import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
>>>>>>> cea54376ca957957c169f476c786a5ae4bf13c00
import React, { useEffect, useRef, useState } from 'react'
import { api } from '@/utils/api'
import LoadingComponent from '@/components/Loading'
import toast from 'react-hot-toast'
<<<<<<< HEAD
import { verifyRole } from '@/utils/verifyRole'
import { ControlPointDuplicateRounded } from '@mui/icons-material'
=======
>>>>>>> cea54376ca957957c169f476c786a5ae4bf13c00

function page() {
  const [type, settype] = useState('')
  const [keyword, setkeyword] = useState('')
<<<<<<< HEAD
  const [prop, setprop] = useState([])
  const [isLoading, setLoading] = useState();
  const doesAPIInProgress = useRef(false);

  const router = useRouter()

  useEffect(() => {
    async function fetchProp() {
      setLoading(true)
      doesAPIInProgress.current = true;

      const verified = await verifyRole("user");
      if (!verified) {
        toast.error('You are not Allowed')
        router.push('/agent')
        return
      }
      if (verified === 'login required') {
        toast.error('Login required')
        router.push('/login')
        return
      }

      try {
        const response = await api.get(`/property/all`)
        console.log('response from API',response);
=======
  const [prop, setprop] = useState()
  const [isLoading, setLoading] = useState();
  const apiRef = useRef(false);

  useEffect(() => {
    async function fetchProp() {
      try {
        setLoading(true)
        const response = await api.get(`/property/all`);
        apiRef.current = true;
>>>>>>> cea54376ca957957c169f476c786a5ae4bf13c00
        setprop(response.data.allprop);
      } catch (error) {
        toast.error('Error in fetch property')
        apiRef.current = false;
        console.log(error);
      } finally {
        doesAPIInProgress.current = true;
        setLoading(false)
      }
    }
<<<<<<< HEAD

    !doesAPIInProgress.current && fetchProp();
  }, [isLoading, prop])
=======
    !apiRef.current && fetchProp();
  }, [])
>>>>>>> cea54376ca957957c169f476c786a5ae4bf13c00


  const serachProp = async () => {
    try {
      console.log(type);

      const response = await api.get(`/property/search?propertyType=${type}&title=${keyword}`);
      console.log(response?.data?.propertydetails);
      if (response.status === 200) {
        setprop(response.data.propertydetails);
        toast.success(response.data.message)
      }

    } catch (error) {
      setprop([])
      toast.error(error?.response?.data?.message)
      console.error('Search error:', error);
    }
  }



  return (
    <>
      {isLoading ? <LoadingComponent /> : <Box boxShadow={"0px 1px 10px 1px #d6d6d6"} padding={2} display={'flex'} justifyContent={'center'} flexDirection={'column'}>

        <Stack minWidth={'80%'} flexDirection={{ xs: "column", sm: "row" }} justifyContent={'center'} alignItems={'center'} gap={3}>


<<<<<<< HEAD
          <TextField id="outlined-basic" value={keyword} placeholder="Enter keyword" size='small' variant="outlined" sx={{ width: "45%" }} onChange={(e) => setkeyword(e.target.value)} />
=======
          <TextField id="outlined-basic" value={keyword} placeholder="Enter keyword" variant="outlined" sx={{ width: "45%" }} onChange={(e) => setkeyword(e.target.value)} />
>>>>>>> cea54376ca957957c169f476c786a5ae4bf13c00

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
            <PropertyListingCard prop={property} key={index}  title={'Buy Property listing'} />
          ))}
        </Stack>
      </Box>}
    </>

  )
}


export default React.memo(page);
