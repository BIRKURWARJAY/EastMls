'use client'

import { useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Make sure to install jwt-decode library
import Header from "@/components/Header";
import "./globals.css";
import useEastmlsStore from "@/store/eastmlsStore";

export default function RootLayout({ children }) {
  const setToken = useEastmlsStore(s => s.setToken);
  const setIsLoggedIn = useEastmlsStore(s => s.setIsLoggedIn);
  const setLoading = useEastmlsStore(s => s.setLoading);
  const initializeToken = useEastmlsStore(s => s.initializeToken);
  
  useEffect(() => {
    // Initialize token from localStorage first
    initializeToken();
    
    if (typeof window !== "undefined") {
      const tokenString = localStorage.getItem("EastMls");

      if (tokenString) {
        try {
          // Parse the JSON string to get the actual token
          const token = JSON.parse(tokenString);
          const decoded = jwtDecode(token);
          // Check if token is expired
          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            console.log("Token expired");
            localStorage.removeItem("EastMls");
            setToken(undefined);
            setIsLoggedIn(false);
            setLoading(false);
            return;
          }
          setToken(token);
          setIsLoggedIn(true);
          console.log("Token decoded:", decoded, Date.now());
        } catch (err) {
          console.error("Invalid token or parsing error", err);
          localStorage.removeItem("EastMls");
          setToken(undefined);
          setIsLoggedIn(false);
          setLoading(false);
        }
      } else {
        setToken(undefined);
        setIsLoggedIn(false);
        setLoading(false);
      }
    }
  }, []); // Remove dependencies to avoid infinite re-renders

  return ( 
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body style={{ margin: 0 }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
