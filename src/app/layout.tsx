import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CTHO Work - Roblox Community Platform",
  description: "The ultimate platform for Roblox creators to connect with their audience, boost engagement, and grow their community like never before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased font-poppins overflow-x-hidden`}
      >
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          className="dark"
          toastOptions={{
            style: {
              background: '#18181b',
              border: '1px solid #3f3f46',
              borderRadius: '2px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
            },
            className: 'dark',
            duration: 4000,
          }}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
