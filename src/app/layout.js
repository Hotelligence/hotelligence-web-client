import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import { Providers } from "./providers";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";


const inter = Inter({ subsets: ["latin"] });
const sfPro = localFont({
  src: [
    {
      path: "../fonts/SFProDisplay/SFProDisplay-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../fonts/SFProDisplay/SFProDisplay-Semibold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../fonts/SFProDisplay/SFProDisplay-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../fonts/SFProDisplay/SFProDisplay-Regular.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../fonts/SFProText/SFProText-Bold.ttf",
      weight: "800",
      style: "btnbold",
    },
  ],
});

export const metadata = {
  title: "Hotelligence",
  description: "Hotel Booking Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={sfPro.className}>
        <Providers>
          <Header />
          <main className="pageContainer"> {children} </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
