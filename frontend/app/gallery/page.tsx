"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Gallery photos organized by category (add Videos)
    const galleryCategories = {
        "Wedding Party": [
            "/photos/wedding-party/bridesmaids.jpg",
            "/photos/wedding-party/Groom's_men.jpg",
            "/photos/wedding-party/bride's_friends.jpg",
            "/photos/wedding-party/groom's_friends.jpg",
        ],
        "Candid Moments": [
            "/photos/gallery/IMG-20250905-WA0001.jpg",
            "/photos/gallery/IMG-20250905-WA0003.jpg",
            "/photos/gallery/IMG-20250905-WA0005.jpg",
            "/photos/gallery/IMG-20250905-WA0007.jpg",
            "/photos/gallery/IMG-20250905-WA0008.jpg",
            "/photos/gallery/IMG-20250905-WA0012.jpg",
            "/photos/gallery/IMG-20250905-WA0015.jpg",
            "/photos/gallery/IMG-20250905-WA0017.jpg",
            "/photos/gallery/IMG-20250905-WA0019.jpg",
            "/photos/gallery/IMG-20250905-WA0020.jpg",
            "/photos/gallery/IMG-20250905-WA0021.jpg",
            "/photos/gallery/IMG-20250905-WA0022.jpg",
            "/photos/gallery/IMG-20250905-WA0024.jpg",
            "/photos/gallery/IMG-20250905-WA0025.jpg",
            "/photos/gallery/IMG-20250905-WA0026.jpg",
        ],
        "Videos": [
            "/photos/videos/video1.mp4",
            "/photos/videos/video2.mp4",
        ],
    } as const;

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
    const [activeCategory, setActiveCategory] = useState<keyof typeof galleryCategories>("Candid Moments");

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
                    src="/photos/gallery/IMG-20250905-WA0021.jpg"
                    alt="Doris and Emmanuel"
                    fill
                    className="object-cover object-top"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-4 pb-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif drop-shadow-xl">
                        Our Gallery
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl font-sans drop-shadow-lg">
                        A collection of our favorite moments. Browse through memories cherished with love.
                    </p>
                    <a href="#gallery" aria-label="See gallery below" className="mt-1 inline-flex items-center justify-center text-white/90 hover:text-white transition">
                        <svg className="h-8 w-8 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </a>
                </div>
            </div>
            {/* Removed misplaced wishlist guidance text */}
            {/* (Deleted the previous relative pt-20 pb-6 section that repeated the title) */}

            {/* Category Filter */}
            <div className="max-w-6xl mx-auto px-6 mb-6 mt-8">
                <div className="flex flex-wrap justify-center gap-4">
                    {Object.keys(galleryCategories).map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category as keyof typeof galleryCategories)}
                            className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${activeCategory === category ? 'text-white bg-gradient-to-r from-dusty-blue-600 to-phoenix-sand-500 border-dusty-blue-600 shadow-lg shadow-dusty-blue-700/20' : 'bg-white/90 text-dusty-blue-700 hover:bg-dusty-blue-50 border-dusty-blue-300 hover:border-dusty-blue-500'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <div id="gallery" className="max-w-7xl mx-auto px-6 pb-24">
                {activeCategory === "Wedding Party" ? (
                    <div className="space-y-12">
                        {Object.entries(weddingPartySections).map(([section, files]) => (
                            <div key={section}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800">{section}</h3>
                                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full" />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {files.map((file) => {
                                        const name = (file as string).replace(/\.(jpg|jpeg|png)$/i, "");
                                        const src = `/photos/wedding-party/${section}/${file}`;
                                        const specialRole = specialRoles[file as keyof typeof specialRoles];
                                        return (
                                            <div key={`${section}-${file}`} className="group flex flex-col items-center bg-white p-3 rounded-xl shadow hover:shadow-lg transition">
                                                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 ring-4 ring-dusty-blue-100 shadow-inner">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={src}
                                                        alt={name}
                                                        style={file === "Anyiaka Florence.jpg" || file === "Dr Itoe Besong.jpg" ? { objectPosition: "0 20%" } : {}}
                                                        className={`absolute inset-0 w-full h-full object-cover ${getObjectPositionClass(file as string)} group-hover:scale-[1.03] transition-transform duration-300 cursor-pointer`}
                                                        onClick={() => openLightbox(src)}
                                                    />
                                                </div>
                                                <div className="mt-3 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <p className="text-sm font-medium text-gray-800 truncate" title={name}>
                                                            {name}
                                                        </p>
                                                        {specialRole && (
                                                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500/90 text-white shadow ring-1 ring-white/40">
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
                ) : activeCategory === "Videos" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {galleryCategories["Videos"].map((videoSrc, index) => {
                            const posters = [
                                "/photos/gallery/IMG-20250905-WA0007.jpg",
                                "/photos/gallery/IMG-20250905-WA0015.jpg",
                            ];
                            const poster = posters[index % posters.length];
                            return (
                                <div key={index} className="rounded-2xl overflow-hidden shadow-lg bg-black">
                                    <div className="relative w-full aspect-video bg-black">
                                        <video
                                            controls
                                            preload="metadata"
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover"
                                            poster={poster}
                                        >
                                            <source src={videoSrc} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryCategories[activeCategory].map((imageSrc, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                                onClick={() => openLightbox(imageSrc)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imageSrc}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
                            alt="Gallery image"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-dusty-blue-600 via-phoenix-sand-500 to-dusty-blue-700">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        More Memories Coming Soon!
                    </h2>
                    <p className="text-xl text-dusty-blue-100 mb-8">
                        We can't wait to add more beautiful photos from our special day.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3 rounded-full bg-white text-dusty-blue-600 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/program"
                            className="px-8 py-3 rounded-full bg-transparent text-white font-semibold text-lg border-2 border-white hover:bg-white hover:text-dusty-blue-600 transition-all duration-300"
                        >
                            View Program
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
