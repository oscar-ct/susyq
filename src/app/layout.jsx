import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Susy Q Cleaning - Green house cleaning services in the Austin and Round Rock metro area",
  description: "Susy Q cleaning is a professional company dedicated to be part of your life. Our interest are focused on meeting your needs by offering high quality services and high level satisfaction to our customers. Our green healthy cleaning techniques provide your home with a cleaner healthier environment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
            <Navbar/>
            <main className={"mt-[58px] sm:mt-[75px]"}>{children}</main>
            <Footer/>
        </body>
    </html>
  );
}
