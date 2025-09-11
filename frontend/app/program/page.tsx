"use client";
import React from "react";
import Link from "next/link";

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-amber-600 transition-colors">
              Wedding
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/program" className="text-amber-600 font-semibold">
                Program
              </Link>
              <Link href="/gallery" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 font-serif">
              Wedding Program
            </h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center font-serif italic">Nupitals</h2>
              <div className="space-y-3 text-base md:text-lg text-gray-700">
                <div className="flex items-center justify-center gap-2">
                  <span>📅</span>
                  <span>Saturday, November 29, 2025</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span>📍</span>
                  <span>Presbyterian Church, Buea Station</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-amber-600">
                  <span>🕐</span>
                  <span>1:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details */}
      <div className="bg-white py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-200 shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">Order of Service</h2>
              <p className="text-gray-600 font-serif italic">Follow along with our wedding ceremony</p>
            </div>

            <div className="space-y-6">
              {/* Procession */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2 font-serif">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Procession
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Session</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">God Parents</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Groom's Parents</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Groom's Men</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Friends of the Groom</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Groom and Best Man</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Ring Security</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Ring Bearer</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9m4.5-5H15a2.5 2.5 0 110 5h-1.5m-4-5v5m4-5v5" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The baby Bridesmaids</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The BridesMaids</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Friends of the Bride</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Brides Parents</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Flower Girl</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3 5.5V16c0 1 1 2 2 2h2c1 0 2-1 2-2v-2.5c1.5-1 3-3 3-5.5 0-3.5-2.5-6-6-6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 18c0 2 2 4 4 4s4-2 4-4" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Bride</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Maid of Honor</p>
                  </div>
                </div>
              </div>

              {/* Service */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2 font-serif">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Service
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Introit of Psalm 128</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Salutation</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Declaration of No Impediment</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Sermon</p>
                  </div>
                </div>
              </div>

              {/* Exchange of Vows */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2 font-serif">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Exchange of Vows
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2c-2 0-3.5 1.5-3.5 3.5S10 9 12 9s3.5-1.5 3.5-3.5S14 2 12 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10v2c0 1 1 2 2 2h4c1 0 2-1 2-2v-2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14v8h6v-8" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 16h4" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Groom</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3 5.5V16c0 1 1 2 2 2h2c1 0 2-1 2-2v-2.5c1.5-1 3-3 3-5.5 0-3.5-2.5-6-6-6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 18c0 2 2 4 4 4s4-2 4-4" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Bride</p>
                  </div>
                </div>
              </div>

              {/* Blessings */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2 font-serif">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Blessings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Declaration of Intention and Consent</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Exchange of Rings</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Declaration of Marriage</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">The Nuptial Blessings</p>
                  </div>
                </div>
              </div>

              {/* Recession */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2 font-serif">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Recession
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14L17 4M9 9v6m6-6v6" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Baby Bridal Party</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Bridal Party</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Bride and Groom</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Session</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-50 transition-colors">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-700 text-center text-sm font-serif">Church Photo Hour</p>
                  </div>
                </div>
              </div>

              {/* Reception */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2 font-serif">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  Reception
                </h3>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-100 transition-colors">
                      <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-700 text-center text-sm font-medium font-serif">Aperitif Hour - 5:00 PM</p>
                    </div>
                    <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-100 transition-colors">
                      <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 616 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-gray-700 text-center text-sm font-medium font-serif">Guest Placement - 6:00 PM</p>
                    </div>
                    <div className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-amber-100 transition-colors">
                      <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <p className="text-gray-700 text-center text-sm font-medium font-serif">Couple Entrance - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-8 bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center font-serif">Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-600 font-serif text-center">
                <li className="flex items-center justify-center gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Please arrive 15 minutes before the ceremony begins</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Photography is welcome during the ceremony</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-amber-600">•</span>
                  <span>Reception venue details will be announced after the ceremony</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-50 to-orange-50 py-8 px-4 border-t border-amber-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-serif">Thank You</h3>
            <p className="text-gray-600 mb-4 font-serif italic">
              We are grateful for your presence as we celebrate this special day together.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>💕</span>
              <span className="font-serif">With love, Doris & Emmanuel</span>
            </div>
            <div className="hidden md:block text-gray-300">|</div>
            <div className="flex items-center gap-2">
              <span>📱</span>
              <span className="font-serif">For updates, contact the wedding party</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
