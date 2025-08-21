'use client'
import toast, { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <title>hello</title>
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body style={{ margin: 0 }}>
        <Toaster
          gutter={5}
          toastOptions={{
            className: '',
            style: {
              border: '1px solid #713200',
              padding: '10px',
              fontSize:"15px",
              color: '#713200',
            },
            duration:"200",
            
          }
        }
        />
        {children}
      </body>
    </html>
  );
}
