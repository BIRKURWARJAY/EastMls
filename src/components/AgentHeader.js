'use client'
import { api } from '@/utils/api'
import { deleteCookie } from '@/utils/cookies'
import { Button, Stack } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function AgentHeader() {

  const router = useRouter()

  const logout = async () => {
    try {
      const response = await api.get('/auth', { withCredentials: true })
      console.log(response);
      if (response.status === 200) {
        deleteCookie('EastMlsUser', '/')
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
      <Stack height={'10vh'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} gap={4} boxShadow={'0px 0px 15px #dbdbdb'}>
        <Link style={{ fontSize: "20px" }} href={'/agent'}>Profile</Link>
        <Link style={{ fontSize: "20px" }} href={'/agent/property'}>Property</Link>
        <Button onClick={() => logout()} variant='outlined' color='warning' >Log out</Button>
      </Stack>
    </>
  )
}

export default AgentHeader
