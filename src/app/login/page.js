'use client'

import { Button, FormControl, FormLabel, Stack, TextField, Typography, Card, InputAdornment, CardContent, IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import Link from "next/link";


export default function Login() {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toggleButton, setToggleButton] = useState("user");

  const Adornment = passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />

  return (
    <Stack id="loginPage" sx={{ height: "auto", minHeight: "calc(100vh - 6rem)", backgroundImage: 'url(/eastmls/registerbg.webp)' }}>

      <Card className="Login-modal" sx={{ width: "30%", bgcolor: "#e2e2e2cc", marginInline: "auto", marginBlock: "auto", borderRadius: "20px", paddingBlock: 4, paddingInline: 2, alignItems: "center", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 800 }}>
          Login to your Account
        </Typography>

        <CardContent sx={{ border: "none", }}>
          <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack>
              <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Email</FormLabel>
              <TextField variant="standard" placeholder="Email" sx={{ bgcolor: "white", padding: "10px", borderRadius: "10px" }}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Stack>

            <Stack>
              <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Password</FormLabel>
              <TextField variant="standard" type="password" placeholder="Password" sx={{ bgcolor: "white", padding: "10px", borderRadius: "10px" }} InputProps={{
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
          </FormControl>
        </CardContent>

        <Typography variant="p" sx={{ fontSize: 20 }}>
          Don't have an account?  <Link href={"/register"}>Register</Link>
        </Typography>

        <Link href={"/forgot-password"}>Forgot password?</Link>
      </Card>
    </Stack>
  )
}