import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "../components/providers/Provider";
import { Toaster } from "sonner";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Mini Workboard",
  description: "A simple workboard application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
</style>
      </Head>
      <body
        className="antialiased bg-gray-100 text-[#27104E]"
      >
       <Provider>{children}</Provider>
       <Toaster />
      </body>
    </html>
  );
}
