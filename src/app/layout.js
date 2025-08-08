'use client'

import Header from "@/components/Header";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import HeaderWrapper from "@/components/HeaderWrapper";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <title>hello</title>
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body style={{ margin: 0 }}>
        <HeaderWrapper />
        <Toaster />
          {children}
      </body>
    </html>
  );
}
