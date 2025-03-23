
import { ReactScan } from "@/components/react-scan/react-scan";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModeToggle } from "@/components/light-dark";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en " suppressHydrationWarning className="w-screen min-h-screen overflow-xhidden">
      <head>

        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script> */}
      </head>
      <body
        className={`antialiased h-full w-full `}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <div className="min-h-screen ">
          {/* <ModeToggle /> */}
          {children}
        </div>
        {/* </ThemeProvider> */}

      </body>
    </html>
  );
}

