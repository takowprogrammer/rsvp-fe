"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-dusty-blue-200/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="px-3 py-2 rounded-md text-dusty-blue-700 font-semibold bg-dusty-blue-50 ring-1 ring-dusty-blue-200 text-sm sm:text-base">Home</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/gallery" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium text-sm lg:text-base">Gallery</Link>
            <Link href="/wedding-party" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium text-sm lg:text-base">Wedding Party</Link>
            <Link href="/program" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium text-sm lg:text-base">Program</Link>
            <Link href="/wishlist" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium text-sm lg:text-base">Wishlist</Link>
            <Link href="/admin/login" className="btn-primary transition text-sm lg:text-base">Login</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dusty-blue-200/40 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/gallery"
                className="block px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/wedding-party"
                className="block px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wedding Party
              </Link>
              <Link
                href="/program"
                className="block px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Program
              </Link>
              <Link
                href="/wishlist"
                className="block px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                href="/admin/login"
                className="block px-3 py-2 rounded-md text-dusty-blue-700 bg-dusty-blue-50 ring-1 ring-dusty-blue-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}