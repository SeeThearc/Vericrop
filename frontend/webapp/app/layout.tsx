import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
// import RoleRedirect from "../components/RoleRedirect";
import AuthInitializer from "../components/AuthInitializer";


export const metadata: Metadata = {
  title: "VeriCrop",
  description: "",
  icons: {
    icon: "./small-logo.png",
    shortcut: "./small-logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <StoreProvider>
          <AuthInitializer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
