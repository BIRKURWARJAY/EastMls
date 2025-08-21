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
        <Header state={state}/>
        {children}
      </>
      }
    </>
  )
}