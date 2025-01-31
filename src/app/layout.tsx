
import "./globals.css";
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en min-h-screen min-w-screen">
      <head>

      </head>
      <body
        className={`antialiased h-full w-full `}
      >

        <div className=" h-full">{children}</div>

      </body>
    </html>
  );
}

