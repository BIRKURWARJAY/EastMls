'use client'

import { api } from "@/utils/api";
import { Button, FormControl, FormLabel, Stack, TextField, Typography, Card, CardContent } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import decodeRole from "@/utils/decodeRole";
import LoadingComponent from "@/components/loading";


export default function ForgotPassword() {

  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validate() {
      const tokenRes = await decodeRole(["user", "agent"], router);

      if (tokenRes) {
        return router.back();
      }

      setLoading(false);
      return;
    }
    validate();
  }, [])

  const validateEmail = async (email) => {
    try {
      if (!email?.trim()) {
        return alert("email is required");
      }
      const res = await api.post("/user/validateEmail", {
        email
      });
      if (res.data.status === "success") {
        return alert("email validated");
      }
      if (res.data.status === 404) {
        return alert("invalid Email")
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const resetPassword = async (email, password) => {
    try {
      if (!email.trim()) {
        return alert("email is required");
      }
      if (!password.trim() || !password.length > 6) {
        return alert("password length must be > 6");
      }

      const res = await api.post("/user/forgot-password", {
        email,
        password
      });
      if (res.status === 201) {
        alert("password changed please login");
        return router.push("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>{loading ? <LoadingComponent /> : <Stack id="loginPage" sx={{ height: "auto", minHeight: "calc(100vh - 6rem)", backgroundImage: 'url(/eastmls/registerbg.webp)' }}>

      <Card className="Login-modal" sx={{ width: "30%", bgcolor: "#e2e2e2cc", marginInline: "auto", marginBlock: "auto", borderRadius: "20px", paddingBlock: 4, paddingInline: 2, alignItems: "center", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 800 }}>
          Forgot Password?
        </Typography>

        <CardContent sx={{ border: "none", width: "100%" }}>
          <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack>
              <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Email</FormLabel>
              <TextField variant="standard" ref={emailRef} placeholder="Email" type="email" sx={{ bgcolor: "white", padding: "10px", borderRadius: "10px" }}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Stack>

            <Button variant="contained" onClick={() => validateEmail(emailRef?.current)} sx={{ paddingBlock: 1.5, bgcolor: "rgb(255 138 0)" }} disabled={!emailRef?.current?.trim()}>
              Submit
            </Button>
          </FormControl>
        </CardContent>

        <Link href={"/login"}>Back to login</Link>
      </Card>
    </Stack>}</>
  )
}