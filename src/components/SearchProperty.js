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
    <Stack sx={{ alignItems: "center" }} maxWidth={{ sm: '100%', md: '50%' }} >
      <ButtonGroup
        value={propertySearch}
      >
        <Button disableRipple variant="contained" sx={{ padding: "10px 20px", borderBottomLeftRadius: 0, border: "none", fontWeight: 600, ...BgColor1 }} onClick={() => setPropertySearch("For Rent")}>For Rent</Button>

        <Button disableRipple variant="contained" sx={{ padding: "10px 20px", borderBottomRightRadius: 0, border: "none", fontWeight: 600, ...BgColor2 }} onClick={() => setPropertySearch("For Sale")}>For Sale</Button>
      </ButtonGroup>

      <Paper sx={{ padding: 4, borderRadius: "10px", width: "100%", padding: "20px 30px" }} >
        <Stack direction={"row"} alignItems={'center'} justifyContent={'center'} display={'flex'} flexWrap={'wrap'} spacing={2}>

          <TextField variant="outlined" label="Enter Keyword" />

          <Select value={property} sx={{ flexGrow: 1, textAlign: "left" }} onChange={handlePropertyChange}>
            <MenuItem value=" " disabled>Select property Type</MenuItem>
            {properties.map(property => <MenuItem key={property} value={property}>{property}</MenuItem>)}
          </Select>

          <Button sx={{ bgcolor: "#faa61f", color: "white", padding: "10px 30px" }} endIcon={<SearchIcon sx={{ fontWeight: 900 }} />}>
            Search Now
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}