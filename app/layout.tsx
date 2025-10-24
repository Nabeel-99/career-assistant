import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
  openGraph: {
    title: "AI-Powered Career Assistant",
    description:
      "Practice AI interviews, optimize your CV, and grow your career smarter.",
    url: "https://career-assistant-beta.vercel.app",
    siteName: "AI Career Assistant",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Career Assistant Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Career Assistant",
    description:
      "Practice AI interviews, optimize your CV, and grow your career smarter.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="dark" suppressHydrationWarning>
      <body className={`${manrope.variable}  antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
