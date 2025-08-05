'use client'

import Header from "@/components/Header";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body style={{ margin: 0 }}>
        <Header />
        <Toaster />
          {children}
      </body>
    </html>
  );
}
