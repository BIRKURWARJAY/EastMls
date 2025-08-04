'use client'

import BreadCrumbs from "@/components/BreadCrumbs";
import decodeToken from "@/utils/decodeToken";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function AgentProperty() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentProperty = async () => {
      try {
        setLoading(true);
        decodeToken("agent", setLoading, router);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchAgentProperty();
  }, []);

  return (
    <>
      {!isLoading && <BreadCrumbs />}
    </>
  )
}