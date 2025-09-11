"use client";
import Link from "next/link";
import { useState } from "react";

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Gallery photos organized by category
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
    };

    const [activeCategory, setActiveCategory] = useState<keyof typeof galleryCategories>("Candid Moments");

    const openLightbox = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100">
            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/photos/story/logo.jpg"
                                    alt="Doris & Emmanuel Wedding Logo"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-200 shadow-lg"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/program"
                                className="px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
                            >
                                Program
                            </Link>
                            <Link
                                href="/admin/login"
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-amber-100 hover:text-amber-800 rounded-lg font-medium transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-20 pb-6">
                <div className="max-w-6xl mx-auto text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-3">
                        Our Gallery
                    </h1>
                    <p className="text-xl text-gray-600 mb-4">
                        Capturing beautiful moments of our love story
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-blue-400 mx-auto mb-4"></div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-6xl mx-auto px-6 mb-6">
                <div className="flex flex-wrap justify-center gap-4">
                    {Object.keys(galleryCategories).map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category as keyof typeof galleryCategories)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeCategory === category
                                ? 'bg-gradient-to-r from-amber-500 to-blue-500 text-white shadow-lg transform scale-105'
                                : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 shadow-md hover:shadow-lg'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                {activeCategory === "Wedding Party" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Left Column - Bridesmaids and Bride's Friends */}
                        <div className="space-y-8">
                            {/* Bridesmaids */}
                            <div
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                                onClick={() => openLightbox("/photos/wedding-party/bridesmaids.jpg")}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/photos/wedding-party/bridesmaids.jpg"
                                    alt="Bridesmaids"
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                        <p className="text-white font-semibold text-center mt-2">Bridesmaids</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bride's Friends */}
                            <div
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                                onClick={() => openLightbox("/photos/wedding-party/bride's_friends.jpg")}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/photos/wedding-party/bride's_friends.jpg"
                                    alt="Bride's Friends"
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                        <p className="text-white font-semibold text-center mt-2">Bride's Friends</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Column - Groomsmen and Groom's Friends */}
                        <div className="space-y-8">
                            {/* Groomsmen */}
                            <div
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                                onClick={() => openLightbox("/photos/wedding-party/Groom's_men.jpg")}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/photos/wedding-party/Groom's_men.jpg"
                                    alt="Groomsmen"
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                        <p className="text-white font-semibold text-center mt-2">Groomsmen</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Groom's Friends */}
                            <div
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                                onClick={() => openLightbox("/photos/wedding-party/groom's_friends.jpg")}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/photos/wedding-party/groom's_friends.jpg"
                                    alt="Groom's Friends"
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                        <p className="text-white font-semibold text-center mt-2">Groom's Friends</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            <div className="py-16 bg-gradient-to-r from-amber-500 via-blue-500 to-amber-600">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        More Memories Coming Soon!
                    </h2>
                    <p className="text-xl text-amber-100 mb-8">
                        We can't wait to add more beautiful photos from our special day.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3 rounded-full bg-white text-amber-600 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/program"
                            className="px-8 py-3 rounded-full bg-transparent text-white font-semibold text-lg border-2 border-white hover:bg-white hover:text-amber-600 transition-all duration-300"
                        >
                            View Program
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-gray-400">&copy; 2025 Doris & Emmanuel Wedding. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
