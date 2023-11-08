import "./globals.css";
import { Inter } from "next/font/google";

import { AuthProvider } from "./context/auth/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mini DashBoard",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body>
        <main className={inter.className}>
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
