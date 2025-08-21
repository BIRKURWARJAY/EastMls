'use client';
import { api } from '../utils/api';
import { Box, Button, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type SellerProps = {
  data:{
    _id:string
    agentId:{
        username:string
        email:string
    }
  }
}

function SellerEnquiry({ data }:SellerProps) {
    const defaultInquiry = {
        name: '',
        phone: '',
        email: '',
        message: '',
        propertyId: data?._id || '',
        agentId: data?.agentId,
        status: "new"
    };

    const [inquiry, setinqury] = useState(defaultInquiry);

    const handleInquiry = async () => {
        if (!inquiry.name || !inquiry.phone || !inquiry.email || !inquiry.message) {
            toast.error('All field required')
            return;
        }

        try {
            const response = await api.post('/inquiry', inquiry);
            console.log(response);
            setinqury(prev => ({ ...prev, name: '', phone: '', email: '', message: '' }));
            if (response.status === 200) {
                toast.success(response.data.message)
            }
        } catch (error:any) {
            toast.error(error.response.data.message)
            console.error("Error sending inquiry:", error);
        }
    };

    return (
        <Stack gap={2} sx={{ m: "2rem", mt: "0px", border: "1px solid #e5e5e5", minWidth: "20rem", padding: "2rem", borderRadius: "10px", bgcolor: "#f9f9f9" }} height={'50%'}>
            <Typography fontWeight={600} variant='h6'>Contact Seller</Typography>
            <Box display={'flex'} gap={1} alignItems={'center'}>
                <img
                    style={{ borderRadius: "100%", height: "4rem", width: "4rem", objectFit: "cover" }}
                    src="https://eastmls.net/_next/image?url=https%3A%2F%2Feastmls-media.s3.us-east-2.amazonaws.com%2F6858fd3eb1f932ffcdda32e4%2FIMG_0329.jpeg&w=256&q=75"
                    alt="Agent"
                />
                <Box>
                    <Typography>{data?.agentId?.username}</Typography>
                    <Typography>{data?.agentId?.email}</Typography>
                </Box>
            </Box>
            <TextField
                value={inquiry.name}
                onChange={(e) => setinqury(prev => ({ ...prev, name: e.target.value }))}
                variant='outlined'
                size='small'
                sx={{ bgcolor: "white" }}
                placeholder='Username'
            />
            <TextField
                value={inquiry.phone}
                onChange={(e) => setinqury(prev => ({ ...prev, phone: e.target.value }))}
                variant='outlined'
                size='small'
                sx={{ bgcolor: "white" }}
                placeholder='Phone number'
            />
            <TextField
                value={inquiry.email}
                onChange={(e) => setinqury(prev => ({ ...prev, email: e.target.value }))}
                variant='outlined'
                size='small'
                sx={{ bgcolor: "white" }}
                placeholder='Email'
            />
            <TextareaAutosize
                value={inquiry.message}
                onChange={(e) => setinqury(prev => ({ ...prev, message: e.target.value }))}
                minRows={3}
                style={{ backgroundColor: "white", border: "1px solid #c4c4c4", borderRadius: "5px", padding: "1rem", paddingTop: "0.5rem" }}
                placeholder='Your message'
            />
            <Button onClick={handleInquiry} fullWidth sx={{ bgcolor: "orange", color: "White", fontWeight: "600" }}>
                Send Enquiry
            </Button>
        </Stack>
    );
}

export default SellerEnquiry;
