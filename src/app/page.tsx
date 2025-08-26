'use client'

import SearchProperty from "../components/SearchProperty";
import { Stack, Typography } from "@mui/material";
import LoadingComponent from "../components/Loading";

import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyRole } from "../utils/verifyRole";
import toast from "react-hot-toast";



export default function Home(){


  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(true);
  const router = useRouter();
  

  useEffect(() => {
    async function validate() {

      const verified = await verifyRole("check");

      if (verified === "login required") {
        setState(false);
        setLoading(false);
        return;
      }

      if (verified === 'agent login') {
        toast.error('Not allowed')
        router.push('/agent/property');
        return;
      }
      setState(true);
      setLoading(false)
    }
    validate();
  }, [])


  return (
    <>
      {loading ? <LoadingComponent /> : <>
        <Header state={state}/>
        <Stack
          direction={"row"}
          sx={{
            color: "white",
            backgroundSize: "cover",
            backgroundPosition: "center",
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
      </>}
    </>
  );
}
