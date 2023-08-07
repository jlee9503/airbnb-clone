import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import SignInModal from "./components/authModals/SignInModal";
import ToastProvider from "./providers/ToasterProvider";
import LoginModal from "./components/authModals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import HostModal from "./components/authModals/HostModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb clone",
  description: "Airbnb clone website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToastProvider />
        <LoginModal />
        <SignInModal />
        <HostModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
