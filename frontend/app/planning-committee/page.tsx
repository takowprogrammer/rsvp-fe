"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PlanningCommitteePage() {
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    // Planning Committee members
    const committeeMembers = [
        {
            name: "Diony Doris",
            image: "/photos/planning comittee/Diony Doris.jpg",
            role: "Committee Member"
        },
        {
            name: "Lilian Vanessa",
            image: "/photos/planning comittee/Lilian Vanessa.jpg",
            role: "Committee Member"
        },
        {
            name: "Mr Sergio",
            image: "/photos/planning comittee/Mr Sergio.jpg",
            role: "Committee Member"
        },
        {
            name: "Naminel",
            image: "/photos/planning comittee/Naminel.jpg",
            role: "Committee Member"
        },
        {
            name: "Sen Nadine",
            image: "/photos/planning comittee/Sen Nadine.jpg",
            role: "Committee Member"
        }
    ];

    const openLightbox = (imageSrc: string) => {
        setSelectedMember(imageSrc);
    };

    const closeLightbox = () => {
        setSelectedMember(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans pt-24">
            {/* Hero Section */}
            <div className="relative h-screen w-full">
                <Image
                    src="/photos/gallery/IMG-20250905-WA0008.jpg"
                    alt="Planning Committee"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 40%' }}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-4 pb-16 sm:pb-20">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-serif drop-shadow-xl leading-tight">
                        Planning Committee
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-2xl font-sans drop-shadow-lg px-2">
                        Meet the amazing team who made our special day possible.
                    </p>
                    <a href="#committee" aria-label="See committee below" className="mt-2 sm:mt-1 inline-flex items-center justify-center text-white/90 hover:text-white transition">
                        <svg className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Committee Members Section */}
            <section id="committee" className="px-4 sm:px-6 py-10 md:py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center font-serif">
                        Our Planning Committee
                    </h2>
                    <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
                        We are deeply grateful to these wonderful people who dedicated their time, energy, and love to help us plan and organize our special day. Their support and hard work made our wedding dreams come true.
                    </p>

                    {/* Committee Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {committeeMembers.map((member, index) => (
                            <div
                                key={member.name}
                                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-dusty-blue-200/40 p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                            >
                                <div
                                    className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 cursor-pointer bg-gradient-to-br from-rose-100 via-gray-100 to-rose-200"
                                    onClick={() => openLightbox(member.image)}
                                >
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm sm:text-base text-dusty-blue-600 font-medium">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Thank You Message */}
                    <div className="mt-12 sm:mt-16 text-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-dusty-blue-200/40 p-6 sm:p-8 max-w-4xl mx-auto">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 font-serif">
                                Thank You
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                To our incredible planning committee, words cannot express how grateful we are for your dedication, creativity, and unwavering support. You turned our vision into reality and made our wedding day absolutely perfect. We love you all!
                            </p>
                            <p className="text-dusty-blue-600 font-semibold mt-4 text-sm sm:text-base">
                                With love and appreciation,<br />
                                Doris & Emmanuel
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={closeLightbox}
                >
                    <div
                        className="relative max-w-4xl max-h-[95vh] mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                            <Image
                                src={selectedMember}
                                alt="Committee Member"
                                width={800}
                                height={800}
                                className="w-full h-auto object-contain max-h-[85vh]"
                            />

                            {/* Close button */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Close image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
