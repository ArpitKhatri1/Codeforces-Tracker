
import "./globals.css";
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en ">
      <head>

      </head>
      <body
        className={`antialiased w-full h-full`}
      >

        {children}

      </body>
    </html>
  );
}

