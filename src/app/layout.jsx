import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    keywords: "susy q, susy q cleaning, house cleaning, cleaning services, austin, texas",
    robots: "index, follow, max-image-preview: large",
    verification: {
      google: "JKNPelzYqvq4H9cuv_31abNyv84JS7GDY_3F5oXQPVE",
    },
    icons: {
        icon: "/icon.ico",
        shortcut: "/icon.ico",
        apple: "/apple-icon.png",
        other: [{ rel: "icon", url: "/icon.png", sizes: "192x192" }],
    },
    openGraph: {
        url: "https://susyqcleaning.com",
        siteName: "Susy Q Cleaning",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
    },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <Analytics/>
            <Navbar/>
            <main className={"pt-14 md:pt-20 min-h-[calc(100vh-320px)] md:min-h-[calc(100vh-176px)]"}>
                {children}
            </main>
            <Footer/>
        </body>
    </html>
  );
}
