//Adding secure authentication and user manager
import { ClerkProvider } from "@clerk/nextjs";
//importing next google font
import { Inter } from "next/font/google";
import '../globals.css'

//SEO
export const metedata = {
  title: "Babble.io",
  description: "A Next.js 13 Meta Chat Application",
};

const inter = Inter({ subsets: ["latin"]})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( 

  <ClerkProvider>
    <html lang="en">
        <body className={`${inter.className} bg-black-1 `}>
            {children}
        </body>
    </html>
  </ClerkProvider>
  )
}
