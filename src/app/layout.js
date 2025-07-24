'use client'

import Header from "../components/Header";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {

  const notHeaderPages = ["/register"]

  const pathname = usePathname()

    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.webp" type="image/webp" />
        </head>
        <body
        >
          {!notHeaderPages.includes(pathname) && <Header />}
          {children}
        </body>
      </html>
    );
  }
