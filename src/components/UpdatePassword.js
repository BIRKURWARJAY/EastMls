import React, { useState } from 'react'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { api } from '@/utils/api'
import axios from 'axios'


function UpdatePassword() {

    const [pass, setpass] = useState({
        oldpassword: "",
        newpassword: "",
    })
    const [compare, setcompare] = useState('')

    const handlesubmit = async (e) => {
        e.preventDefault()

        if (pass.newpassword !== compare) {
            toast.error('Confirm password is not same')
            return
        }


        try {
            const response = await api.put('/user/change-password', pass);
            if (response.status === 200) {
                toast.success(response.data.message);
                setpass({
                    oldpassword: "",
                    newpassword: "",
                })
                setcompare('')
            }
        } catch (error) {
            toast.error(error.response.data.message);

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setpass((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form >
            <Grid container spacing={2} maxWidth={'60rem'} p={4}>
                <Grid size={{ xs: 12, sm: 12 }}>
                    <Typography variant='h3'>Your information</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }} >
                    <TextField required fullWidth variant='outlined' name='oldpassword' size='small' placeholder='Old password' value={pass.oldpassword || ''} onChange={handleChange} />

                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                    <TextField required fullWidth variant='outlined' name='newpassword' size='small' placeholder='New password' value={pass.newpassword || ''} onChange={handleChange} />
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                    <TextField fullWidth variant='outlined' name='compare' size='small' placeholder='Confirm new password' value={compare || ''} onChange={(e) => setcompare(e.target.value)} />
                </Grid>


                <Grid size={{ xs: 12, sm: 12 }} alignSelf={'start'}>
                    <Button type='submit' fullWidth onClick={(e) => handlesubmit(e)} variant='contained' sx={{ fontSize: "15px" }} color='warning'>Change</Button>
                </Grid>


            </Grid>

        </form>
    )
}

export default UpdatePassword
