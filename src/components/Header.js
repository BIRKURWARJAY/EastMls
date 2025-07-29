'use client'


import { Button, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';



export default function Header() {

  return (
    <Grid container component={"header"} sx={{ zIndex: 100, position: "sticky", top: 0, justifyContent: "space-between", paddingBlock: "16px", height: "6rem", alignItems: "center", bgcolor: "white", paddingInline: "32px", boxShadow: "5px 5px 10px gray", width: "fit", minWidth: "100%" }} >
      <Grid size={{ xs: 2 }}>
        <Image
          src="/eastmls/logo.webp"
          alt="Logo"
          width={80}
          height={80}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Stack direction={"row"} gap={4}>
          <Link href={"/"}>Home</Link>
          <Link href={"/buy-property"}>Buy Property</Link>
          <Link href={"/sell-property"}>Sell Property</Link>
          <Link href={"/property-list"}>Property List</Link>
          <Link href={"/agents"}>Agents</Link>
        </Stack>
      </Grid>

      <Grid direction={"row"} gap={4} fontSize={20} alignItems={"center"} fontWeight={500} >
        <Stack direction={"row"} gap={2}>
          <Button variant="contained" bgcolor="#faa61f" sx={{ paddingBlock: 1, paddingInline: 2, color: "white", bgcolor: "#faa61f", borderRadius: 1 }} startIcon={<SearchIcon />} >
            Sell Property
          </Button>

          <Link href={"/login"}>
            <Button variant='outlined' bgcolor="transparent" sx={{ paddingBlock: 1, paddingInline: 2 }} >
              Login
            </Button>
          </Link>
        </Stack>
      </Grid>
    </Grid>
  )
}