'use client'


import Header from "@/src/components/Header";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingComponent from "@/src/components/Loading";
import { verifyRole } from "@/src/utils/verifyRole";
import toast from "react-hot-toast";
import { getCookie } from "@/src/utils/cookies";
import AgentHeader from "@/src/components/AgentHeader";
import CryptoJS from "crypto-js";

export default function Layout({ children }: { children: ReactNode }): ReactNode {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<boolean>();
  const [user, setuser] = useState<any>({})

  useEffect(() => {
    async function validate(): Promise<void> {

      const verified = await verifyRole("all");

      const decrytedUser: any = JSON.parse(CryptoJS.AES.decrypt(getCookie('EastMlsUser')!, process.env.NEXT_PUBLIC_CRYPTOJS_SECRET_KEY!).toString(CryptoJS.enc.Utf8));
      setuser(decrytedUser)

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
        {user?.role === 'user' ?
          <Header state={state!} /> : <AgentHeader />
        }
        {children}
      </>
      }
    </>
  )
}