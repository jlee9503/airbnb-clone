import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import SignInModal from "./components/authModals/SignInModal";
import ToastProvider from "./providers/ToasterProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb clone",
  description: "Airbnb clone website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToastProvider />
        <SignInModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
