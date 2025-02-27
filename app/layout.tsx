import type { Metadata } from "next";
import { Geist, Roboto  } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers/providers";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipes App",
  description: "Show recipes app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
