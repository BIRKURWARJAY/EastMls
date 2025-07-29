'use client'


import { Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';



export default function Header() {

  return (
    <Stack direction={"row"} component={"header"} sx={{ zIndex: 100, position: "sticky", top: 0, justifyContent: "space-between", paddingBlock: "16px", height: "6rem", alignItems: "center", bgcolor: "white", paddingInline: "32px", boxShadow: "0px 0px 10px #dbdbdb" }} >
      <Image
        src="/eastmls/logo.webp"
        alt="Logo"
        width={80}
        height={80}
      />
      <Stack direction={"row"} gap={4} fontWeight={"semibold"} fontSize={"1rem"}>
        <Link href={"/"}>Home</Link>
        <Link href={"/buy-property"}>Buy Property</Link>
        <Link href={"/property"}>Property List</Link>
        <Link href={"/agents"}>Agents</Link>
        <Link href={"/my-inquries"}>My inquries</Link>
      </Stack>

      <Stack direction={"row"} gap={4} fontSize={20} alignItems={"center"} fontWeight={500} >
        <Button variant="contained" bgcolor="#faa61f" sx={{ paddingBlock: 1, paddingInline: 2, color: "white", bgcolor: "#faa61f", borderRadius: 1 }} startIcon={<SearchIcon />} >
          Sell Property
        </Button>

        <Link href={"/login"}>
        <Button variant='outlined' bgcolor="transparent" sx={{ paddingBlock: 1, paddingInline: 2 }} >
          Login
        </Button>
        </Link>

      </Stack>
    </Stack>
  )
}