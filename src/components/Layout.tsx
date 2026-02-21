import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyFooterCTA from "@/components/MobileStickyFooterCTA";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-16 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyFooterCTA />
    </div>
  );
}
