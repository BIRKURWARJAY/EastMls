'use client'

import { useRouter } from "next/navigation";
import SearchProperty from "../components/SearchProperty";
import { Stack, Typography } from "@mui/material";
import { eastMlsStore } from "@/store/eastMlsStore";
import { useEffect, useState } from "react";
import decodeToken from "@/utils/decodeToken";
import LoadingComponent from "@/components/loading";



export default async function Home() {
  const router = useRouter();
  const setRole = eastMlsStore(s => s.setRole);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validate() {
      const tokenRes = await decodeToken("user", router);
      if (tokenRes?.decodedToken?.role === agent) {
        setRole("agent");
        router.replace("/agent/property");
        return;
      }
      setLoading(false);
    }
    validate();
  }, [])

  return (
    <>
      {loading ? <LoadingComponent /> : <Stack
        direction={"row"}
        sx={{
          color: "white",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "auto",
          minHeight: "88vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: 'url("/eastmls/homebanner.webp")',
          margin: 0,
          maxWidth: "100%"
        }}
      >
        <Stack sx={{ alignItems: "center", gap: 2, textAlign: "center" }}>
          <Typography variant="h1" fontSize={{ xs: '25px', md: '50px' }} sx={{ fontWeight: 800, maxWidth: "80%" }} >WE'LL HELP YOU FIND A PLACE YOU'LL LOVE</Typography>
          <Typography fontSize={{ xs: '15px', md: '20px' }} className="text-2xl max-w-3xl">Find a variety of properties that suit you very easily. Forget all difficulties in finding a residence for you.</Typography>
          <SearchProperty />
        </Stack>
      </Stack>}
    </>
  );
}
