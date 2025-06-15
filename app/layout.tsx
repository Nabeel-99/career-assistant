import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Powered Career Assistant",
  description: "AI-Powered Career Assistant",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className={`${manrope.variable}  antialiased`}>{children}</body>
    </html>
  );
}
