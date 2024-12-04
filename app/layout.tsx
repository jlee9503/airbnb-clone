import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import SignInModal from "./components/authModals/SignInModal";
import ToastProvider from "./providers/ToasterProvider";
import LoginModal from "./components/authModals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import HostModal from "./components/authModals/HostModal";
import SearchModal from "./components/authModals/SearchModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Rent App",
  description: "Property renting website",
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
        <SearchModal />
        <LoginModal />
        <SignInModal />
        <HostModal />
        <Navbar currentUser={currentUser} />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
