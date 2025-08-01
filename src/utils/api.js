'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Api({ token }) {


  const router = useRouter()
  const [loading, setloading] = useState(false)



  useEffect(() => {
    try {
      setloading(true)
      if (!token) {
        router.push('/login')
      }
      console.log("cookie data", token);

      setloading(false)
    } catch (error) {
      console.log(error);

    }
  }, [token])

  return (
    <>
      {loading && (
        <div className='h-screen w-screen flex justify-center items-center'>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  )

}

export default Api
