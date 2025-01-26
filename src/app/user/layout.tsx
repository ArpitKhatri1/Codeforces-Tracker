"use client"
import Navbar from "@/components/navbar";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en ">
            <body
                className={`antialiased w-full h-full`}
            >
                <div>
                    <Navbar />
                </div>
                <div>
                    {children}
                </div>
            </body>
        </html>
    );
}

