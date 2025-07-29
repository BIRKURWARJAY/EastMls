import { Box, Button, Stack, TextareaAutosize, TextField, Typography } from '@mui/material'
import React from 'react'

function SellerEnquiry() {
    return (
        <>
            <Stack gap={2} width={'50%'} sx={{ m: "2rem", border: "1px solid #e5e5e5", padding: "2rem", borderRadius: "10px", bgcolor: "#f9f9f9" }} height={'50%'}>
                <Typography fontWeight={600} variant='h6'>Contact Seller</Typography>
                <Box display={'flex'} gap={1} alignItems={'center'}>
                    <img style={{ borderRadius: "100%", height: "4rem", width: "4rem", objectFit: "cover", objectPosition: "0rem 0rem" }} src="https://eastmls.net/_next/image?url=https%3A%2F%2Feastmls-media.s3.us-east-2.amazonaws.com%2F6858fd3eb1f932ffcdda32e4%2FIMG_0329.jpeg&w=256&q=75" alt="" />
                    <Box>
                        <Typography>Hussien ali</Typography>
                        <Typography>liveagent1@yopmail.com</Typography>
                    </Box>
                </Box>
                <TextField variant='outlined' size='small' sx={{ bgcolor: "white" }} placeholder='Username' />
                <TextField variant='outlined' size='small' sx={{ bgcolor: "white" }} placeholder='Phone number' />
                <TextField variant='outlined' size='small' sx={{ bgcolor: "white" }} placeholder='Email' />
                <TextareaAutosize minRows={8} variant='outlined' style={{ backgroundColor: "white", border: "1px solid #c4c4c4", borderRadius:"5px", padding:"1rem", paddingTop:"0.5rem" }} placeholder='Your message' />
                <Button fullWidth sx={{bgcolor:"orange", color:"White", fontWeight:"600"} }>Send Enquiry</Button>
            </Stack>
        </>
    )
}

export default SellerEnquiry
