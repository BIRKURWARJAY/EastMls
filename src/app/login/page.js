'use client'

import { Button, FormLabel, Stack, TextField, Typography, Card, InputAdornment, CardContent, IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "@/components/ErrorText";
import { useRouter } from "next/navigation";
import useEastmlsStore from "../../store/eastmlsStore.js";
import { api } from "@/utils/api.js";


export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toggleButton, setToggleButton] = useState("user");
  const setIsLoggedIn = useEastmlsStore(s => s.setIsLoggedIn);

  const Adornment = passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />

  const YupValidation = Yup.object().shape({
    email: Yup.string().email('invalid email').required('Email is required'),
    password: Yup.string().trim('password is required').min(6, 'password length must be > 6').required('password is required')
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: YupValidation,
    onSubmit: async (values) => {
      try {
        const res = await api.post("/auth/login", {
          email: values.email,
          password: values.password,
          role: toggleButton
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
          router.push("/buy-property")
          localStorage.setItem("EastMls", JSON.stringify(res.data.token));
        };
      } catch (error) {
        console.error(error);
      }
    }
  })



  return (
    <Stack id="loginPage" sx={{ height: "auto", minHeight: "calc(100vh - 5.6rem)",  backgroundImage: 'url(/eastmls/registerbg.webp)' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>

      <Card className="Login-modal" sx={{ maxWidth: "50rem", marginBlock: 2, bgcolor: "#e2e2e2cc", borderRadius: "20px", padding: 4, paddingInline: 2, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 800 }}>
          Login to your Account
        </Typography>

        <CardContent sx={{ border: "none", }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Stack>
                <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Email</FormLabel>
                <TextField variant="standard" placeholder="Email" name="email"
                  slotProps={{
                    input: { style: { backgroundColor: "white", padding: "10px", borderRadius: "10px" }, disableUnderline: true }
                  }}
                  value={formik.values.email}
                  helperText={formik.touched.email && formik.errors.email && <ErrorText helperText={formik.errors.email} />}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error
                />
              </Stack>

              <Stack>
                <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Password</FormLabel>
                <TextField variant="standard" type={passwordVisible ? "text" : "password"} placeholder="Password" name="password"
                  slotProps={{
                    input: {
                      style: { backgroundColor: "white", padding: "10px", borderRadius: "10px" }, disableUnderline: true, endAdornment: <InputAdornment position="end">
                        <IconButton onClick={() => setPasswordVisible(prev => !prev)}>
                          {Adornment}
                        </IconButton>
                      </InputAdornment>,
                    }
                  }}

                  value={formik.values.password}
                  helperText={formik.touched.password && formik.errors.password && <ErrorText helperText={formik.errors.password} />}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error
                />
              </Stack>

              <Stack direction={"row"} sx={{ gap: 2 }}>
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
                  onClick={() => {
                    setToggleButton("agent")
                    formik.resetForm()
                  }}
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

              <Button variant="contained" type="submit" sx={{ paddingBlock: 1.5, bgcolor: "rgb(255 138 0)" }}>
                Login
              </Button>
            </Stack>
          </form>
        </CardContent>

        <Typography variant="p" sx={{ fontSize: 20 }}>
          Don't have an account?  <Link href={"/register"}>Register</Link>
        </Typography>


        <Link href={"/forgot-password"}>Forgot password?</Link>
      </Card>
    </Stack>
  )
}