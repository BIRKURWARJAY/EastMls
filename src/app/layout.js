// import Header from "../components/Header";
import Header from "@/components/Header";
import "./globals.css";
import eastmlsStore from "@/store/eastmlsStore";


export default async function RootLayout({ children }) {

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
