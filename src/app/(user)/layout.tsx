'use client'


import Header from "../../components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/Loading";
import toast from "react-hot-toast";
import { verifyRole } from "../../utils/verifyRole";

export default function Layout({ children }: any) {

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function validate() {
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