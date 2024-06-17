import type { Metadata } from "next";
import "./globals.css";
import { NextLayout, NextProvider } from "./providers";
import { noto_sans } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://resortbnb.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Resort bnb",
  description: "Resort bnb 로 여행을 떠나세요",
  keywords: ["Resortbnb", "여행", "숙소", "호텔", "펜션", "최저가"],
  openGraph: {
    title: "Resortbnb로 여행하기",
    description: "Resortbnb 로 여행을 계획해보세요",
    url: "https://resortbnb.vercel.app",
    siteName: "Resortbnb",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto_sans.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
