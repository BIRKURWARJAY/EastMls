'use client'

import { useRouter } from "next/navigation";
import BreadCrumbs from "@/components/BreadCrumbs";
import { jwtDecode } from "jwt-decode";
import useEastmlsStore from "@/store/eastmlsStore";
import { useEffect, useState } from "react";


export default function AgentProperty() {
  const token = useEastmlsStore(s => s.token);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const decode = jwtDecode(token);
    if (!decode) {
      console.log("token not found");
      router.push("/login");
    }
    if (decode.role !== "agent") {
      console.log("not allowed");
      router.push(-1)
    }
    setLoading(false);
  }, [])

  return (
    <>
      {!loading && <BreadCrumbs />}
    </>
  )
}