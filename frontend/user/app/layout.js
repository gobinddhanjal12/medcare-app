import "./globals.css";
import Header from "./components/Header/Header";
import { Montserrat } from "next/font/google";
import Footer from "./components/Footer/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Medcare",
  description: "Health in Your Hands.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
