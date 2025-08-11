// 'use client'

import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import { eastMlsStore } from "@/store/eastMlsStore";

export default function RootLayout({ children }) {

  const role = eastMlsStore.getState.role;

  return (
    <html lang="en">
      <title>hello</title>
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body style={{ margin: 0 }}>
        {role === "user" || "undefined" ? <Header /> : null}
        <Toaster />
          {children}
      </body>
    </html>
  );
}
