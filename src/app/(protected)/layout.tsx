'use client'


import Header from '@/src/components/Header';
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingComponent from "@/src/components/Loading";
import { verifyRole } from "@/src/utils/verifyRole";
import toast from "react-hot-toast";


export default function Layout({ children }: {children: ReactNode}): ReactNode {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<boolean>(false);


  useEffect(() => {
    async function validate(): Promise<void> {
      const verified = await verifyRole("check");

      if (verified === "login required") {
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