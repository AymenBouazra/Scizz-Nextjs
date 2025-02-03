import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastBar, Toaster } from "react-hot-toast";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Scizz",
  description: "Your free url shortener",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="../assets/img/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="../assets/img/favicon.svg" />
        <link rel="shortcut icon" href="../assets/img/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="../assets/img/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Scizz" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 pt-10">
          {children}
        </div>
        <Toaster
          position="bottom-right"
          {...(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? 'custom-enter 1s ease'
                  : 'custom-exit 1s ease forwards',
              }}
            />
          )}
        />
      </body>
    </html>
  );
}
