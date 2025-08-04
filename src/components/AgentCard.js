'use client'
import { Box, Stack, Typography } from '@mui/material'
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Image from 'next/image'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import { useRouter } from 'next/navigation';

function AgentCard({ temp }) {

    const router = useRouter()


    return (
        <div className=' w-[100%] '>

            {temp?.length > 0 && temp?.map((data, index) => (

                <Stack onClick={() => router.push(`/agents/${data.id}`)} key={index} sx={{ cursor: "pointer", width: "100%" }} display={'flex'} flexWrap={'wrap'} gap={3} mb={4} flexDirection={'row'} p={2} boxShadow={'0px 0px 10px 0px #dbdbdb'} borderRadius={5} width={'65%'}>

                        <img height={2000} width={300} style={{ height: "15rem !important", objectFit: "cover", borderRadius: "10px", minWidth: "20rem" }} src={data.image} alt="hello" />
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'stretch'} gap={0.5}>
                        <Typography variant='h5' fontWeight={700}>{data.name}</Typography>
                        <Typography variant='body1'>{data.role}</Typography>

                        <Box display={'flex'} gap={1} mt={3}>
                            <PhoneCallbackIcon />
                            <Typography >{data.number}</Typography>
                        </Box>
                        <Box display={'flex'} gap={1}>
                            <DraftsOutlinedIcon />
                            <Typography >{data.email}</Typography>
                        </Box>
                        <Box display={'flex'} gap={1}>
                            <HomeOutlinedIcon />
                            <Typography >{data.property}</Typography>
                        </Box>

                        <Box borderTop={'1px solid #dbdbdb'}>
                            <FacebookIcon fontSize='large' sx={{ color: "gray", mt: "1rem" }} />
                        </Box>

                    </Box>
                </Stack>
            ))}
        </div>
    )
}

export default AgentCard
