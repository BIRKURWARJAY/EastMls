import { Breadcrumbs, colors, Stack, Typography } from '@mui/material'
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';

function BreadCrumbs({ array }) {
    
    return (
        <>
            <Stack spacing={2} width={'100%'} borderBottom={`1px solid ${colors.grey[200]}`} >
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{paddingBottom:"10px"}}
                >
                    {array}
                </Breadcrumbs>
            </Stack>
        </>
    )
}

export default BreadCrumbs
