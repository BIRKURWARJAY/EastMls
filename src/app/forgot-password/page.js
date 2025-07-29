import { Button, FormControl, FormLabel, Stack, TextField, Typography, Card, CardContent } from "@mui/material";
import Link from "next/link";


export default function Login() {


  return (
    <Stack id="loginPage" sx={{ height: "auto", minHeight: "calc(100vh - 6rem)", backgroundImage: 'url(/eastmls/registerbg.webp)' }}>

      <Card className="Login-modal" sx={{ width: "30%", bgcolor: "#e2e2e2cc", marginInline: "auto", marginBlock: "auto", borderRadius: "20px", paddingBlock: 4, paddingInline: 2, alignItems: "center", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 800 }}>
          Forgot Password?
        </Typography>

        <CardContent sx={{ border: "none", width: "100%" }}>
          <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Stack>
              <FormLabel sx={{ fontSize: 18, color: "black", marginLeft: .5 }}>Email</FormLabel>
              <TextField variant="standard" placeholder="Email" type="email" sx={{ bgcolor: "white", padding: "10px", borderRadius: "10px" }}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </Stack>

            <Button variant="contained" sx={{ paddingBlock: 1.5, bgcolor: "rgb(255 138 0)" }}>
              Submit
            </Button>
          </FormControl>
        </CardContent>

        <Link href={"/login"}>Back to login</Link>
      </Card>
    </Stack>
  )
}