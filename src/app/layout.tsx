import type { Metadata } from "next";
import "./globals.css";
import UserProvider from "./context/UserContext";
import ProfileProvider from "./context/ProfileContext";
import SelectedTagsContextProvider from "./context/SelectedTagsContext";

export const metadata: Metadata = {
  title: "Advanced Todo App",
  description:
    "This is a advanced todo app which support database saves with auth etc.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="openSansFont ">
      <body className="flex flex-col items-center">
        <SelectedTagsContextProvider>
          <ProfileProvider>
            <UserProvider>{children}</UserProvider>
          </ProfileProvider>
        </SelectedTagsContextProvider>
      </body>
    </html>
  );
}
