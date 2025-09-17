"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function WeddingPartyPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Wedding Party sections with individual portraits per subfolder
  const weddingPartySections = {
    "Bridesmaids": [
      "Nadine.jpg",
      "Ashley.jpg",
      "Blanche.jpg",
      "Bright.jpg",
      "Channel.jpg",
      "Clarisse.jpg",
      "Judith.jpg",
      "Nancy.jpg",
      "Nyufi.jpg",
      "Ngwikem Anasthasia.jpg",
    ],
    "Bride's Friends": [
      "Anyiaka Florence.jpg",
      "Arrey Claudia.jpg",
      "Asabkia Marie.jpg",
      "Lilian Vanessa.jpg",
      "Londe Cecilia.jpg",
      "Mberako Gift.jpg",
      "Melly Melvis.jpg",
    ],
    "Groomsmen": [
      "Dr Itoe Besong.jpg",
      "Dr Brandon.jpg",
      "Dr Conrald.jpg",
      "Dr Franklin.jpg",
      "Dr Herman.jpg",
      "Dr Rickeins.jpg",
      "Dr Stephan.jpg",
      "Dr Tohson.jpg",
      "Mr Kima.jpg",
      "Mr Narcisse.jpg",
    ],
    "Groom's Friends": [
      "Dr Ekaney Domin.jpg",
      "Dr Forbang Ako.jpg",
      "Dr Jerry Brown.jpg",
      "Dr Kadzem Lionel.jpg",
      "Dr Takang Ashu.jpg",
      "Dr Toh Bemsibom.jpg",
      "Mr Ntuba Alain.jpg",
    ],
  } as const;

  // Improve head framing for specific portraits
  const headFocusFiles = new Set([
    "Dr Brandon.jpg",
    "Mr Kima.jpg",
    "Dr Tohson.jpg",
    "Mr Narcisse.jpg",
    "Nadine.jpg",
    "Ashley.jpg",
    "Blanche.jpg",
    "Bright.jpg",
    "Channel.jpg",
    "Clarisse.jpg",
    "Judith.jpg",
    "Nancy.jpg",
    "Nyufi.jpg",
    "Ngwikem Anasthasia.jpg",
  ]);

  // Identify special roles
  const specialRoles = {
    "Nadine.jpg": "Maid of Honor",
    "Dr Itoe Besong.jpg": "Best Man"
  };

  const getObjectPositionClass = (file: string) => {
    // List of images that need center positioning
    const centerPositionFiles = [
      "Ashley.jpg",
      "Melly Melvis.jpg",
      "Arrey Claudia.jpg",
      "Judith.jpg",
      "Clarisse.jpg",
      "Nancy.jpg"
    ];

    // For Florence and Best Man, we'll use object-center since object-bottom didn't work
    // We'll adjust with custom CSS for these specific images
    if (file === "Anyiaka Florence.jpg" || file === "Dr Itoe Besong.jpg") {
      return "object-center";
    }

    if (centerPositionFiles.includes(file)) return "object-center";
    return headFocusFiles.has(file) ? "object-top" : "object-center";
  };

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans pt-24">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <Image
          src="/photos/wedding-party/bridesmaids.jpg"
          alt="Wedding Party"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-4 pb-16 sm:pb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-serif drop-shadow-xl leading-tight">
            Wedding Party
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl font-sans drop-shadow-lg px-2">
            Meet the amazing people who will be standing with us on our special day.
          </p>
          <a href="#wedding-party" aria-label="See wedding party below" className="mt-2 sm:mt-1 inline-flex items-center justify-center text-white/90 hover:text-white transition">
            <svg className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Wedding Party Grid */}
      <div id="wedding-party" className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="space-y-8 sm:space-y-12">
          {Object.entries(weddingPartySections).map(([section, files]) => (
            <div key={section}>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{section}</h3>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {files.map((file) => {
                  const name = (file as string).replace(/\.(jpg|jpeg|png)$/i, "");
                  const src = `/photos/wedding-party/${section}/${file}`;
                  const specialRole = specialRoles[file as keyof typeof specialRoles];
                  return (
                    <div key={`${section}-${file}`} className="group flex flex-col items-center bg-white p-2 sm:p-3 rounded-xl shadow hover:shadow-lg transition">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 ring-2 sm:ring-4 ring-dusty-blue-100 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={name}
                          style={file === "Anyiaka Florence.jpg" || file === "Dr Itoe Besong.jpg" ? { objectPosition: "0 20%" } : {}}
                          className={`absolute inset-0 w-full h-full object-cover ${getObjectPositionClass(file as string)} group-hover:scale-[1.03] transition-transform duration-300 cursor-pointer`}
                          onClick={() => openLightbox(src)}
                        />
                      </div>
                      <div className="mt-2 sm:mt-3 text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                          <p className="text-xs sm:text-sm font-medium text-gray-800 truncate" title={name}>
                            {name}
                          </p>
                          {specialRole && (
                            <span className="px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/90 text-white shadow ring-1 ring-white/40">
                              {specialRole}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Wedding party member"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-r from-dusty-blue-600 via-phoenix-sand-500 to-dusty-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Thank You to Our Wedding Party!
          </h2>
          <p className="text-lg sm:text-xl text-dusty-blue-100 mb-6 sm:mb-8">
            We're so grateful to have such wonderful people by our side on our special day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/"
              className="px-6 sm:px-8 py-3 rounded-full bg-white text-dusty-blue-600 font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
            <Link
              href="/gallery"
              className="px-6 sm:px-8 py-3 rounded-full bg-transparent text-white font-semibold text-base sm:text-lg border-2 border-white hover:bg-white hover:text-dusty-blue-600 transition-all duration-300"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}