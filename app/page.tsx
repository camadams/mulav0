import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SpendWise</h1>
        <p className="text-xl mb-8">
          Track your spendings easily and efficiently
        </p>
        <Link href="/dashboard">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </>
  );
}
