import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./Provider";
import { Toaster } from "sonner";

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
      <body
        className="antialiased"
      >
       <Provider>{children}</Provider>
       <Toaster />
      </body>
    </html>
  );
}
