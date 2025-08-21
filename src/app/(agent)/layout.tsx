'use client'

import AgentHeader from '@/src/components/AgentHeader'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { verifyRole } from '@/src/utils/verifyRole';
import toast from 'react-hot-toast';
import LoadingComponent from '@/src/components/Loading';

function layout({ children }:any) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    async function validate() {
      const verified = await verifyRole("agent");
      if (!verified) {
        toast.error('Your are not allowed')
        router.back();
        return;
      }
      if (verified === 'login required') {
        toast.error('login required')
        router.push('/login')
        return;
      }
      setLoading(false);
    }
    validate()
  }, [children])


  return (
    <>
      {loading ? <LoadingComponent /> : <>
        <AgentHeader />
        {children}
      </>
      }
    </>
  )
}

export default layout
