import "./globals.css";
import { Inter } from "next/font/google";
// import Navbar from './components/Navbar'
// import { AuthProvider } from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpendWise",
  description: "Track your spendings easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider>
          <Navbar /> */}
        <main className="container mx-auto p-1 pb-24">{children}</main>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
