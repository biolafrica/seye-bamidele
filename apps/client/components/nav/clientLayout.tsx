"use client";

import { ThemeProvider } from "../common/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="bg-background border-x border-separator px-4 py-6 lg:px-16 sm:px-8 sm:py-8 min-h-screen ">
        <Header />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
}