import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

//   const loggedIn = { firstName: 'Moyo', lastName: 'Made' };

  return (
    <main className="flex h-screen w-full font-inter">
        {/* <Sidebar user={loggedIn} /> */}
        <Sidebar />

        <div className="flex size-full flex-col">
            <Navbar />

            <div className="root-layout">
                {/* <Image src="/icons/logo.svg" width={30} height={30} alt="Menu Icon" /> */}

                {/* <div>
                <MobileNav user={loggedIn} />
                </div> */}
            </div>
            
            {children}
        </div>
    </main>
  );
}
