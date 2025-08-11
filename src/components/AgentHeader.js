'use client'
import { api } from '@/utils/api'
import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function AgentHeader() {

    const router = useRouter()

    const logout = async () => {
        try {
            const response = await api.get('/auth', {withCredentials:true})
            console.log(response);
            if (response.status === 200) {
                toast.success(response.data.message)
                router.push('/login')
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in logout')

        }

    }

    return (
        <>
            <Stack width={'100%'} height={'10vh'} justifyContent={'center'} alignItems={'center'}>

                <Button onClick={() => logout()} variant='outlined' color='warning' >Log out</Button>
            </Stack>
        </>
    )
}

export default AgentHeader
