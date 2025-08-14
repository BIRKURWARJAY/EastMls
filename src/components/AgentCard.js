'use client'
import { Box, Stack, Typography } from '@mui/material';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function AgentCard({ agent }) {
    const router = useRouter();
   console.log(agent,'///////////');
   

    return (
        <div className='w-full'>
                <Stack
                    onClick={() => router.push(`/agents/${agent._id}`)}
                    sx={{
                        cursor: "pointer",
                        width: "100%",
                        transition: "transform 0.2s",
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0px 0px 15px 0px #c3c3c3'
                        }
                    }}
                    display='flex'
                    alignItems='center'
                    flexWrap='wrap'
                    gap={3}
                    mb={4}
                    flexDirection='row'
                    p={2}
                    boxShadow='0px 0px 10px 0px #dbdbdb'
                    borderRadius={5}
                    width='65%'
                >
                    <img
                        style={{
                            height: "15rem",
                            width: "20rem",
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                        src={agent.profileImage || '/default-profile.jpg'}
                        alt={`${agent.username}'s Profile Picture`}
                    />

                    <Box display='flex' flexDirection='column' justifyContent='start' alignItems='stretch' gap={0.5}>
                        <Typography variant='h5' fontWeight={700}>{agent.username}</Typography>
                        <Typography variant='body1'>{agent.role}</Typography>

                        <Box display='flex' gap={1} mt={3}>
                            <PhoneCallbackIcon />
                            <Typography>{agent.number}</Typography>
                        </Box>
                        <Box display='flex' gap={1}>
                            <DraftsOutlinedIcon />
                            <Typography>{agent.email}</Typography>
                        </Box>
                        <Box display='flex' gap={1}>
                            <HomeOutlinedIcon />
                            <Typography>{agent.property || "No Properties Listed"}</Typography>
                        </Box>

                        <Box borderTop='1px solid #dbdbdb'>
                            <FacebookIcon fontSize='large' sx={{ color: "gray", mt: "1rem" }} />
                        </Box>
                    </Box>
                </Stack>
        </div>
    );
}

export default AgentCard;
