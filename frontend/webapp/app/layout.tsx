import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
// import RoleRedirect from "../components/RoleRedirect";
import AuthInitializer from "../components/AuthInitializer";
import DataProvider from "../context/Context.jsx";

export const metadata: Metadata = {
  title: "VeriCrop",
  description: "",
  icons: {
    icon: "./small-logo.png",
    shortcut: "./small-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className="antialiased"
        style={{
          backgroundImage: "url('/parallex.png')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <StoreProvider>
        <AuthInitializer />
        < DataProvider >
          {children}
        </ DataProvider >
        </StoreProvider>
      </body>
    </html>
  );
}
