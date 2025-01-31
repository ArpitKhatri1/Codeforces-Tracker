
import Navbar from "@/components/navbar";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-full ">
            <div>
                <Navbar />
            </div>
            <div className="flex-grow h-full">
                {children}
            </div>
        </div>
    );
}

