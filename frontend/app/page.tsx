"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const slides = [
    "/photos/crop-slide/crop1.jpg",
    "/photos/crop-slide/crop2.jpg",
    "/photos/crop-slide/crop3.jpg",
    "/photos/crop-slide/crop4.jpg",
    "/photos/crop-slide/crop5.jpg",
    "/photos/crop-slide/crop6.jpg",
    "/photos/crop-slide/crop8.jpg",
  ];

  const objectPositions = [
    "center top", // For crop1.jpg - show heads at top
    "center top", // For crop2.jpg - show heads at top
    "center top", // For crop3.jpg - show heads at top
    "center top", // For crop4.jpg - show heads at top
    "center top", // For crop5.jpg - show heads at top
    "center top", // For crop6.jpg - show heads at top
    "center top", // For crop8.jpg - show heads at top
  ];

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const weddingDate = new Date("2025-11-29T00:00:00").getTime();
      const now = new Date().getTime();
      const distance = weddingDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 font-sans">
      {/* Navigation Header */}
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

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden" style={{ marginTop: "80px" }}>
        {/* Loading indicator */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-gray-100 to-rose-200 flex items-center justify-center z-30">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-rose-300 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading beautiful moments...</p>
            </div>
          </div>
        )}
        {/* Slideshow images */}
        {slides.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt="Wedding invitation background"
                fill
                className="object-cover transition-transform duration-[20000ms] ease-linear hover:scale-105"
                style={{ objectPosition: objectPositions[idx] || "center" }}
                priority={idx === 0}
                quality={90}
                sizes="100vw"
                onLoad={() => idx === 0 && setImagesLoaded(true)}
              />
            </div>
          </div>
        ))}
        {/* Hero overlay: Couple names */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-end text-center pb-24">
          <div className="rounded-2xl bg-black/35 md:bg-black/25 text-white backdrop-blur-sm px-8 py-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-serif">Doris & Emmanuel</h1>
          </div>
        </div>
      </div>

      {/* Removed first Our Story section as requested */}
      {/* Our Story */}
      <section id="our-story" className="px-6 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center font-serif">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Card 1: Video + Text */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-dusty-blue-200/40 p-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-dusty-blue-50">
                <video controls preload="metadata" playsInline className="absolute inset-0 w-full h-full object-contain">
                  <source src="/photos/story/our_story_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="text-gray-600 text-base italic leading-normal mt-4 space-y-4 font-playfair-display">
                <p>{`From the moment our paths first crossed, it felt like the universe had nudged us together. What began as a simple conversation in a health T.V show on wellness, grew into countless shared moments—coffee dates that turned into hours of laughter, quiet walks where words weren't even necessary, and late-night talks about everything and nothing. We discovered not just love, but a true friendship, one that carried us through challenges and made the joyful moments shine even brighter. Every day with each other became a reminder that love doesn't have to be complicated-it just has to be true.`}</p>
                <p>{`Now, standing on the threshold of marriage, we look back at the journey that brought us here with grateful hearts. Every memory, every challenge, every embrace has led to this moment, where we choose each other openly and without hesitation. We aren't just promising forever-we're celebrating the forever that has already begun. Hand in hand, we're ready to step into this new chapter, knowing that whatever life brings, we'll face it together as partners, as best friends, and as soulmates.`}</p>
                <p className="font-great-vibes">{`GOD BE OUR HELPER`}</p>
              </div>
            </div>

            {/* Card 2: Image + Scripture Text */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-dusty-blue-200/40 p-4">
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
                <Image
                  src="/photos/story/story3.jpg"
                  alt="Story photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="text-gray-600 text-base italic leading-normal mt-4 space-y-4">
                <p className="font-playfair-display">{`Marriage is truly not an achievement but a fulfillment of purpose.`}</p>
                <p className="font-great-vibes">{`Mark 10:6 - 9 " ... At the beginning off creation God made them male and female." for this reason a man will leave his father and mother and be united to his wife, and the two will become one flesh. Therefore what God has joint together, let no one Seperate.`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Countdown */}
      <section id="countdown" className="px-6 py-10 md:py-16">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-md border border-dusty-blue-200/40 p-6 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 font-serif">Countdown to Our Big Day</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-dusty-blue-50 text-dusty-blue-800 p-6 border border-dusty-blue-200">
              <div className="text-3xl md:text-4xl font-extrabold">{Math.max(0, timeLeft.days)}</div>
              <div className="text-sm mt-1 font-medium">Days</div>
            </div>
            <div className="rounded-2xl bg-dusty-blue-50 text-dusty-blue-800 p-6 border border-dusty-blue-200">
              <div className="text-3xl md:text-4xl font-extrabold">{Math.max(0, timeLeft.hours)}</div>
              <div className="text-sm mt-1 font-medium">Hours</div>
            </div>
            <div className="rounded-2xl bg-dusty-blue-50 text-dusty-blue-800 p-6 border border-dusty-blue-200">
              <div className="text-3xl md:text-4xl font-extrabold">{Math.max(0, timeLeft.minutes)}</div>
              <div className="text-sm mt-1 font-medium">Minutes</div>
            </div>
            <div className="rounded-2xl bg-dusty-blue-50 text-dusty-blue-800 p-6 border border-dusty-blue-200">
              <div className="text-3xl md:text-4xl font-extrabold">{Math.max(0, timeLeft.seconds)}</div>
              <div className="text-sm mt-1 font-medium">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Explore */}
      <section id="explore" className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/program" className="group rounded-2xl bg-white/90 border border-dusty-blue-200/60 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl mb-3">🗓️</div>
            <h3 className="text-lg font-semibold text-gray-800">View Program</h3>
            <p className="text-gray-600 mt-1">See the schedule for our special day.</p>
            <span className="mt-4 inline-block px-3 py-2 rounded-md bg-dusty-blue-50 text-dusty-blue-700 ring-1 ring-dusty-blue-200 group-hover:bg-dusty-blue-100 transition">Open Program →</span>
          </Link>
          <Link href="/gallery" className="group rounded-2xl bg-white/90 border border-dusty-blue-200/60 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl mb-3">📷</div>
            <h3 className="text-lg font-semibold text-gray-800">Explore Gallery</h3>
            <p className="text-gray-600 mt-1">Browse lovely photos and memories.</p>
            <span className="mt-4 inline-block px-3 py-2 rounded-md bg-dusty-blue-50 text-dusty-blue-700 ring-1 ring-dusty-blue-200 group-hover:bg-dusty-blue-100 transition">Open Gallery →</span>
          </Link>
          <Link href="/wishlist" className="group rounded-2xl bg-white/90 border border-dusty-blue-200/60 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="text-lg font-semibold text-gray-800">Gift Registry</h3>
            <p className="text-gray-600 mt-1">Find gift ideas we would truly cherish.</p>
            <span className="mt-4 inline-block px-3 py-2 rounded-md bg-dusty-blue-50 text-dusty-blue-700 ring-1 ring-dusty-blue-200 group-hover:bg-dusty-blue-100 transition">See Wishlist →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}