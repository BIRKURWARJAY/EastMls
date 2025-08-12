'use client'

import SearchProperty from "../components/SearchProperty";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/loading";
import { verifyRole } from "@/utils/verifyRole";
import toast from "react-hot-toast";



export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    async function validate() {

      const verified = await verifyRole("user");
      setLoading(false)
      if (!verified) {
        toast.error('Your are not allowed')
        router.push('/agent')
        return
      }
      if (verified === 'login required') {
      toast.error('login required')
        router.push('/login')
        return
      }
    }
    validate();
  }, [])


  return (
    <>
      {
        loading ? <LoadingComponent /> :
          <Stack
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
          </Stack>
      }
    </>
  );
}
