'use client'

import { useEffect } from "react";
import Header from "../components/Header";
import "./globals.css";
import eastmlsStore from "@/store/eastmlsStore";


export default function RootLayout({ children }) {

  const setIsLoggedIn = eastmlsStore(state => state.setIsLoggedIn);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(document.cookie?.includes("EastMls"));
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body
        style={{ margin: 0 }}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
