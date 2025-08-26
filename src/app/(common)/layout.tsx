'use client'


import Header from "@/src/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "@/src/components/Loading";
import { verifyRole } from "@/src/utils/verifyRole";
import toast from "react-hot-toast";


export default function Layout({ children }:any) {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<boolean>();

  useEffect(() => {
    async function validate() {

      const verified = await verifyRole("all");

      if (verified === "login required") {
        toast.error("please Login");
        router.replace("/login");
        return;
      }

      setState(true);
      setLoading(false)
    }
    validate();
  }, [children])


  return (
    <>
      {loading ? <LoadingComponent /> : <>
        <Header state={state!}/>
        {children}
      </>
      }
    </>
  )
}