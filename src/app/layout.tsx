import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advanced Todo App",
  description:
    "This is a advanced todo app which support database saves with auth etc.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="openSansFont ">
      <body className="min-h-dvh flex flex-col items-center ">{children}</body>
    </html>
  );
}
