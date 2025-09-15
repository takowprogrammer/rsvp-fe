"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  // Hide navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-dusty-blue-200/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="px-3 py-2 rounded-md text-dusty-blue-700 font-semibold bg-dusty-blue-50 ring-1 ring-dusty-blue-200">Home</Link>
          <div className="flex items-center gap-6">
            <Link href="/gallery" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium">Gallery</Link>
            <Link href="/program" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium">Program</Link>
            <Link href="/wishlist" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium">Wishlist</Link>
            <Link href="/admin/login" className="btn-primary transition">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}