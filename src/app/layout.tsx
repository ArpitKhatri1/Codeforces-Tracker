
import { ReactScan } from "@/components/react-scan/react-scan";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en ">
      <head>

        <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
      </head>
      <body
        className={`antialiased h-full w-full `}
      >

        <div className="min-h-screen">
          {children}</div>

      </body>
    </html>
  );
}

