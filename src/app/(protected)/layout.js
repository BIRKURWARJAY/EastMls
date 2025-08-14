'use client'


import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/Loading";
import { verifyRole } from "@/utils/verifyRole";
import toast from "react-hot-toast";


export default function Layout({ children }) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState();


  useEffect(() => {
    async function validate() {
      const verified = await verifyRole("check");

      if (verified === "login required") {
        setState(false);
        setLoading(false)
        return;
      }

      if (verified === 'user login') {
        router.back()
        return;
      }
      if (verified === 'agent login') {
        router.back();
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
        {children}
      </>
      }
    </>
  )
}