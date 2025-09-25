import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProviders } from "../lib/chakra-providers";
import { ApolloProviders } from "../lib/apollo-provider";
import { UserProvider } from "../lib/user-context";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Challenge",
  description: "Next.js App with Chakra UI and Apollo Client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.variable}>
        <ChakraProviders>
          <ApolloProviders>
            <UserProvider>
              <Navbar />
              <main style={{ minHeight: "calc(100vh - 120px)" }}>
                {children}
              </main>
              <Footer />
            </UserProvider>
          </ApolloProviders>
        </ChakraProviders>
      </body>
    </html>
  );
}
