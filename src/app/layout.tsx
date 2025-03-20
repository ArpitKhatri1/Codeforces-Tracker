
import { ReactScan } from "@/components/react-scan/react-scan";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en min-h-screen min-w-screen">

      <body
        className={`antialiased h-full w-full `}
      >

        <div className=" h-full">{children}</div>

      </body>
    </html>
  );
}

