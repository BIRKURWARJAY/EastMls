'use client'

import { Button, Stack, TextField, Typography, Card, InputAdornment, CardContent, IconButton, FormLabel } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";




export default function Login() {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toggleButton, setToggleButton] = useState("user");

  const Adornment = passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />

  const YupValidation = Yup.object().shape({
    fullName: Yup.string('only number is not allowed as name').trim('fullName is required').min(1).required('fullName is required'),
    email: Yup.string().email('invalid Email').required('Email is required'),
    licenseNumber: Yup.string(),
    password: Yup.string().trim('password is required').min(6).required('password is required')
  })



  return (
    <Stack id={"registerPage"} sx={{ width: "100%", minHeight: "100vh", height: "auto", backgroundImage: 'url(/eastmls/registerbg.webp)' }}>

      <Card className="Login-modal" sx={{ width: "30%", bgcolor: "#e2e2e2cc", marginInline: "auto", marginBlock: "auto", borderRadius: "20px", paddingBlock: 4, paddingInline: 2, alignItems: "center", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 800 }}>
          Create your Account
        </Typography>

        <CardContent sx={{ border: "none", }}>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              licenseNumber: "",
              password: ""
            }}
            validationSchema={YupValidation}
          >
            {(formik) => (
              <Stack spacing={2}>
                <Stack>
                  <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Full Name</FormLabel>
                  <TextField variant="standard" name="fullName" placeholder="Enter Your Name" sx={{ bgcolor: "white", outline: "none", borderRadius: "10px", padding: "10px" }} InputProps={{
                    disableUnderline: true,
                  }}
                    error={formik.errors.fullName}
                    helperText={<Typography variant="body2" component={"span"} color="red">{formik.errors.fullName}</Typography>}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Stack>

                <Stack>
                  <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Email</FormLabel>
                  <TextField variant="standard" name="email" placeholder="Enter Your Email" sx={{ bgcolor: "white", outline: "none", borderRadius: "10px", padding: "10px" }} InputProps={{
                    disableUnderline: true
                  }} />
                </Stack>

                {toggleButton === "agent" && (
                  <Stack>
                    <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>License Number</FormLabel>
                    <TextField variant="standard" name="licenseNumber" placeholder="Enter Your License Number" sx={{ bgcolor: "white", outline: "none", borderRadius: "10px", padding: "10px" }} InputProps={{
                      disableUnderline: true
                    }} />
                  </Stack>
                )}

                <Stack>
                  <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Password</FormLabel>
                  <TextField variant="standard" name="password" type="password" placeholder="Enter Your Password" sx={{ bgcolor: "white", padding: "10px", borderRadius: "10px" }} InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton onClick={() => setPasswordVisible(prev => !prev)}>
                        {Adornment}
                      </IconButton>
                    </InputAdornment>,
                    disableUnderline: true
                  }} />
                </Stack>

                <Stack direction={"row"} sx={{ gap: 4 }}>
                  <Button variant="contained"
                    onClick={() => setToggleButton("user")}
                    sx={{ bgcolor: toggleButton === "user" ? "rgb(255 138 0)" : "white", color: toggleButton === "user" ? "white" : "black", borderRadius: "15px", display: "flex", flexDirection: "column", width: "50%", paddingBlock: 4 }}
                    disableRipple
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }} component={"p"}>
                      User
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: "80%", fontSize: 12, letterSpacing: 1 }} >
                      Explore listed properties
                    </Typography>
                  </Button>

                  <Button variant="contained"
                    onClick={() => setToggleButton("agent")}
                    disableRipple
                    sx={{ bgcolor: toggleButton === "agent" ? "rgb(255 138 0)" : "white", color: toggleButton === "agent" ? "white" : "black", display: "flex", borderRadius: "15px", flexDirection: "column", width: "50%", paddingBlock: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }} component={"p"}>
                      Agent
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: "80%", fontSize: 12, letterSpacing: 1 }}>
                      List properties & connect with clients.
                    </Typography>
                  </Button>
                </Stack>

                <Button variant="contained" sx={{ paddingBlock: 1.5, bgcolor: "rgb(255 138 0)" }}>
                  Login
                </Button>
              </Stack>
            )}
          </Formik>
        </CardContent>

        <Typography variant="p" sx={{ fontSize: 20 }}>
          Already have an account?  <Link href={"/login"}>Login</Link>
        </Typography>
      </Card>
    </Stack >
  )
}