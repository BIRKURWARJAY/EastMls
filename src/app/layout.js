// import Header from "../components/Header";
import Header from "@/components/Header";
import "./globals.css";
import eastmlsStore from "@/store/eastmlsStore";
// import Api from "@/utils/api";
import { cookies } from 'next/headers'


export default async function RootLayout({ children }) {

  const cookiesdata = await cookies()
  const token = cookiesdata.get('Eastmls')?.value || '';

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body
        style={{ margin: 0 }}
      >
        {/* <Api token={token}/> */}
        <Header />
        {children}
      </body>
    </html>
  );
}
