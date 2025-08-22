'use client'


import Header from "../../components/Header";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingComponent from "../../components/Loading";
import toast from "react-hot-toast";
import { verifyRole } from "../../utils/verifyRole";

export default function Layout({ children }: {children: ReactNode}): ReactNode {

  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function validate(): Promise<void> {
      const verified = await verifyRole("user");

      if (verified === "login required") {
        toast.error("please Login");
        router.replace("/login");
        return;
      }

      if (!verified) {
        toast.error('Your are not allowed')
        router.back()
        return;
      }

      setState(true);
      setLoading(false);
    }
    validate();
  }, [children])


  return (
    <>
      {loading ? <LoadingComponent /> : <>
        <Header state={state} />
        {children}
      </>}
    </>
  )
}