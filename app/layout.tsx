import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIYU SENSEI",
  description: "일본 뉴스로 배우는 일본어 학습 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
