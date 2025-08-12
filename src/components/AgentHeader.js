'use client'
import { api } from '@/utils/api'
import { Button, Stack } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function AgentHeader() {

    const router = useRouter()


    async function Logout() {
        try {
            const res = await api.get("/auth", { withCredentials: true });
            if (res.data.status === "success") {
                toast.success(res.data.message);

                router.push("/login");
            }
        } catch (error) {
            console.error("Error logging out...", error);
        }
    }

    return (
        <>
            <Stack height={'10vh'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} gap={4} boxShadow={'0px 0px 15px #dbdbdb'}>
                <Link style={{ fontSize: "20px" }} href={'/agent'}>Profile</Link>
                <Link style={{ fontSize: "20px" }} href={'/agent/property'}>Property</Link>
                <Button onClick={() => Logout()} variant='outlined' color='warning' >Log out</Button>
            </Stack>
        </>
    )
}

export default AgentHeader
