'use client'

import { useState } from "react";
import { Button, ButtonGroup, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


export default function SearchProperty() {
  const [propertySearch, setPropertySearch] = useState("For Rent");
  const [property, Setproperty] = useState(" ");

  const BgColor2 = propertySearch === "For Sale" ? { bgcolor: "#faa61f", color: "white" } : { bgcolor: "white", color: "Black" };
  const BgColor1 = propertySearch === "For Rent" ? { bgcolor: "#faa61f", color: "white" } : { bgcolor: "white", color: "Black" };

  const properties = ["Apartment", "House", "Condo", "Villa", "Commercial"];

  const handlePropertyChange = (e) => {
    Setproperty(e.target.value)
  }

  return (
    <Stack sx={{ alignItems: "center"}}  maxWidth={{ sm: '100%', md: '70%' }} >
      <ButtonGroup
        value={propertySearch}
      >
        <Button disableRipple variant="contained" sx={{ padding: "10px 20px", borderBottomLeftRadius: 0, border: "none", fontWeight: 600, ...BgColor1 }} onClick={() => setPropertySearch("For Rent")}>For Rent</Button>

        <Button disableRipple variant="contained" sx={{ padding: "10px 20px", borderBottomRightRadius: 0, border: "none", fontWeight: 600, ...BgColor2 }} onClick={() => setPropertySearch("For Sale")}>For Sale</Button>
      </ButtonGroup>

      <Paper sx={{ borderRadius: "10px", padding: "20px 30px" }} >
        <Stack direction={"row"} alignItems={'center'} justifyContent={'space-between'} display={'flex'} flexWrap={'wrap'} gap={2}>

          <TextField variant="outlined" label="Enter Keyword" sx={{width: {xs: "100%", md: "31%"}}}  />

          <Select value={property} sx={{ width: {xs:"100%",md:"31%"}, textAlign: "left" }} onChange={handlePropertyChange}>
            <MenuItem value=" " disabled>Select property Type</MenuItem>
            {properties.map(property => <MenuItem key={property} value={property}>{property}</MenuItem>)}
          </Select>

          <Button sx={{ bgcolor: "#faa61f", color: "white", padding: "15px 10px", width:{xs: "100%", md: "31%"} }} endIcon={<SearchIcon sx={{ fontWeight: 900 }}/>}>
            Search Now
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}