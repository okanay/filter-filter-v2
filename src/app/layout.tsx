import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Filter Your Log Files",
  description: "Filter your log files with ease using this tool",
  creator: "Okan Ay",
  applicationName: "File Filterer",
  keywords: ["filter", "log", "files", "tool"],
  authors: [
    {
      name: "Okan Ay",
      url: "https://okanay.com/",
    },
    {
      name: "Spyke Games",
      url: "https://spykegames.com/",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
