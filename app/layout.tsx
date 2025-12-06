import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maya AI Assistant Demo - MyUnifi",
  description: "Context-aware AI assistant demo for MyUnifi telco app powered by Claude",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
