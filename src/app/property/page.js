"use client"
import PropertyListingCard from '@/components/PropertyListingCard'
import { Box, Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { flexbox, style } from '@mui/system'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {

    const demo = [
        {
            id: "1",
            image: "https://eastmls-media.s3.us-east-2.amazonaws.com/6858fd3eb1f932ffcdda32e4/properties/68755e5ded97ed8b3feb74e8/images/IMG_0607.jpeg",
            name: "Villa in killimani",
            location: "house in killimani",
            price: "80000000",
            typeof: "for sale",

        },
        {
            id: "2",
            image: "https://eastmls-media.s3.us-east-2.amazonaws.com/6858fd3eb1f932ffcdda32e4/properties/68755e5ded97ed8b3feb74e8/images/IMG_0607.jpeg",
            name: "Villa in killimani",
            location: "house in killimani",
            price: "80000000",
            typeof: "for sale",

        },
    ]

    const [value, setvalue] = useState([])
    const [type, settype] = useState('Property type')

    const router = useRouter()

    return (
        <>
            <Stack flexDirection={'row'}  display={'flex'} justifyContent={'center'} flexWrap={'wrap'} boxShadow={"0px 1px 10px 1px #d6d6d6"} py={4} gap={2}>
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
                <PropertyListingCard data={demo} title={'Property listing'} />
            </Stack>
        </>
    )
}

export default page
