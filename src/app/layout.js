import Header from "@/components/Header";
import "./globals.css";
import useEastmlsStore from "@/store/eastmlsStore";



export default async function RootLayout({ children }) {

  // const setToken = useEastmlsStore(s => s.setToken);

  // if (typeof window !== undefined) {
  //   setToken(JSON.parse(localStorage.getItem("EastMls"))?.token);
  // }

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
