import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata = {
  title: "Z Distribution",
  description: "Wholesale partner for branded  products",
  icons: {
    icon: "/logo-z-distribution.png",
    apple: "/logo-z-distribution.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
