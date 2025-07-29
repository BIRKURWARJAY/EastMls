"use client"
import PropertyListingCard from '@/components/PropertyListingCard'
import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { style } from '@mui/system'
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
    const [type, settype] = useState('')

    const router = useRouter()

    return (
        <>
            <Stack direction={"row"} boxShadow={"0px 1px 10px 1px #d6d6d6"} padding={2} gap={3}>
                <ToggleButtonGroup
                    value={value}
                    onChange={(e, newvalue) => setvalue(newvalue)}
                    
                    sx={{ gap: "1rem",width:"20%" }}>
                    <ToggleButton value={"rent"} sx={{ backgroundColor: "rgb(255 245 230)", borderRadius: "0rem", width: "50%" }} size='large'>
                        <Typography fontSize={12} fontWeight={600} color='black'>For Rent</Typography>
                    </ToggleButton >
                    <ToggleButton value={"sale"} sx={{ backgroundColor: "rgb(255 245 230)", borderRadius: "0rem", width: "50%" }} size='large'>
                        <Typography fontSize={12} fontWeight={600} color='black'>For Sale</Typography>
                    </ToggleButton >
                </ToggleButtonGroup>

                <TextField id="outlined-basic" placeholder="Enter keyword" variant="outlined" sx={{ width: "30%" }} />

                <FormControl sx={{ width: '40%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Property type</InputLabel>
                    <Select
                        labelId="Property type"
                        id="demo-simple-select-helper"
                        value={type}
                        label="Age"
                        onChange={(e) => settype(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'villa'}>villa</MenuItem>
                        <MenuItem value={'home'}>home</MenuItem>
                        <MenuItem value={'flat'}>flat</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{ backgroundColor: "orange", width:"10%"}} >Search</Button>
            </Stack>

            <Stack sx={{ mt: "3rem" }} padding={2}>
                <PropertyListingCard data={demo} />
            </Stack>
        </>
    )
}

export default page
