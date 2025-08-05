'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import { useEffect, useState } from 'react'

const HIDDEN_ROUTES = ['/agent/property','/agent/property/create']

export default function HeaderWrapper() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null 

  // const shouldHideNavbar =
  //   HIDDEN_ROUTES.includes(pathname) || pathname.startsWith('/')

  // if (shouldHideNavbar) return null

  return <Header />
}
