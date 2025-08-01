'use client'

import { Button, Stack, TextField, Typography, Card, InputAdornment, CardContent, IconButton, FormLabel } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "@/components/ErrorText";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";




export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toggleButton, setToggleButton] = useState("user");

  const Adornment = passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />

  const YupValidation = Yup.object().shape({
    fullName: Yup.string('only number is not allowed as name').trim('fullName is required').min(1).required('fullName is required'),
    email: Yup.string().email('invalid Email').required('Email is required'),
    licenseNumber: Yup.string(),
    password: Yup.string().trim('password is required').min(6, 'password length must be > 6').required('password is required')
  })

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      licenseNumber: "",
      password: ""
    },
    validationSchema: YupValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKENDURI}api/auth`, {
          username: values.fullName,
          email: values.email,
          licenseNumber: values.licenseNumber,
          password: values.password,
          role: toggleButton
        }
        )

        res.status === 200 && toast.success(data.message.message);
        router.push("/login");
      } catch (error) {
        toast.error(error.message.message)
      }
    }
  })

  return (
    <Stack id={"registerPage"} sx={{ width: "100%", height: "auto", backgroundImage: 'url(/eastmls/registerbg.webp)' }}>

      <Card className="Login-modal" sx={{ maxWidth: "50rem", bgcolor: "#e2e2e2cc", marginInline: "auto", marginBlock: "auto", borderRadius: "20px", paddingBlock: 4, paddingInline: 2, alignItems: "center", display: "flex", flexDirection: "column", marginBlock: 2, gap: 2 }}>
        <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 800 }}>
          Create your Account
        </Typography>

        <CardContent sx={{ border: "none", }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Stack>
                <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Full Name</FormLabel>
                <TextField
                  variant="standard"
                  name="fullName"
                  placeholder="Enter Your Name"
                  slotProps={{
                    input: { style: { backgroundColor: "white", borderRadius: "10px", padding: "10px" }, disableUnderline: true }
                  }}
                  value={formik.values.fullName}
                  error
                  helperText={formik.touched.fullName && formik.errors.fullName && <ErrorText helperText={formik.errors.fullName} />}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Stack>

              <Stack>
                <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Email</FormLabel>
                <TextField variant="standard" name="email" placeholder="Enter Your Email"
                  slotProps={{
                    input: { style: { backgroundColor: "white", borderRadius: "10px", padding: "10px" }, disableUnderline: true }
                  }}
                  value={formik.values.email}
                  helperText={formik.touched.email && formik.errors.email && <ErrorText helperText={formik.errors.email} />}
                  error
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Stack>

              {toggleButton === "agent" && (
                <Stack>
                  <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>License Number</FormLabel>

                  <TextField variant="standard" name="licenseNumber" placeholder="Enter Your License Number"
                    slotProps={{
                      input: { style: { backgroundColor: "white", borderRadius: "10px", padding: "10px" }, disableUnderline: true }
                    }}
                    value={formik.values.licenseNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Stack>
              )}

              <Stack>
                <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Password</FormLabel>
                <TextField variant="standard" name="password" type={passwordVisible ? "text" : "password"} placeholder="Enter Your Password"
                  slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">
                        <IconButton onClick={() => setPasswordVisible(prev => !prev)}>
                          {Adornment}
                        </IconButton>
                      </InputAdornment>,
                      style: { backgroundColor: "white", borderRadius: "10px", padding: "10px" },
                      disableUnderline: true
                    }
                  }}
                  value={formik.values.password}

                  helperText={formik.touched.password && formik.errors.password && <ErrorText helperText={formik.errors.password} />}
                  error
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Stack>

              <Stack direction={"row"} sx={{ gap: 2 }} flexWrap={{ xs: "wrap", sm: "nowrap" }} justifyContent={'center'}>
                <Button variant="contained"
                  onClick={() => setToggleButton("user")}
                  sx={{ bgcolor: toggleButton === "user" ? "rgb(255 138 0)" : "white", color: toggleButton === "user" ? "white" : "black", borderRadius: "15px", display: "flex", flexDirection: "column", paddingBlock: 4, width: { xs: "100%", sm: "50%" } }}
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
                  sx={{ bgcolor: toggleButton === "agent" ? "rgb(255 138 0)" : "white", color: toggleButton === "agent" ? "white" : "black", display: "flex", borderRadius: "15px", flexDirection: "column", width: { xs: "100%", sm: "50%" }, paddingBlock: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }} component={"p"}>
                    Agent
                  </Typography>
                  <Typography variant="body2" sx={{ maxWidth: "80%", fontSize: 12, letterSpacing: 1 }}>
                    List properties & connect with clients.
                  </Typography>
                </Button>
              </Stack>

              <Button type="submit" variant="contained" sx={{ paddingBlock: 1.5, bgcolor: "rgb(255 138 0)" }}>
                Login
              </Button>
            </Stack>
          </form>
        </CardContent>

        <Typography variant="p" sx={{ fontSize: 20 }}>
          Already have an account?  <Link href={"/login"}>Login</Link>
        </Typography>
      </Card>
    </Stack >
  )
}