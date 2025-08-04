'use client'

import BreadCrumbs from "@/components/BreadCrumbs";
import LoadingComponent from "@/components/loading";
import decodeToken from "@/utils/decodeToken";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function AgentProperty() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const tokenRes = decodeToken("agent", router);

    const fetchAgentProperty = async () => {
      try {
        setLoading(true);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    tokenRes && fetchAgentProperty();
  }, []);

  return (
    <>
      {isLoading ? <LoadingComponent /> : <BreadCrumbs />}
    </>
  )
}