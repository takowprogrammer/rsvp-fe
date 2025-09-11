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
    'center top', // For crop1.jpg - show heads at top
    'center top', // For crop2.jpg - show heads at top
    'center top', // For crop3.jpg - show heads at top
    'center top', // For crop4.jpg - show heads at top
    'center top', // For crop5.jpg - show heads at top
    'center top', // For crop6.jpg - show heads at top
    'center top', // For crop8.jpg - show heads at top
  ];

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const weddingDate = new Date('2025-11-29T00:00:00').getTime();
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
    }, 6000); // Increased to 6 seconds for better viewing
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-gray-50 to-rose-100 font-sans">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-200/30 shadow-sm">
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
                  className="w-12 h-12 rounded-full object-cover border-2 border-rose-200 shadow-lg"
                />
                <span className="text-xl font-semibold text-gray-700 tracking-wider">
                  D & E
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/gallery"
                className="px-4 py-2 text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/wedding-party"
                className="px-4 py-2 text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                Wedding Party
              </Link>
              <a
                href="/admin/login"
                className="px-6 py-2 bg-gradient-to-r from-rose-500 to-gray-500 hover:from-rose-600 hover:to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden" style={{marginTop: '80px'}}>
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
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt="Wedding invitation background"
                fill
                className="object-cover transition-transform duration-[20000ms] ease-linear hover:scale-105"
                style={{ objectPosition: objectPositions[idx] || 'center' }}
                priority={idx === 0}
                quality={90}
                sizes="100vw"
                onLoad={() => idx === 0 && setImagesLoaded(true)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj9v/2Q=="
              />
            </div>
            {/* Enhanced overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </div>
        ))}

        {/* Slideshow Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                idx === current
                  ? 'bg-rose-500 border-rose-300 shadow-lg scale-125 shadow-rose-500/50'
                  : 'bg-white/30 border-white/50 hover:bg-white/60 hover:border-white/80 hover:scale-110'
              }`}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col items-start justify-end text-left p-12 md:p-24">
          <div className="max-w-xl text-white">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-serif italic text-rose-100 mb-2">
                Together with their families
              </h2>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight mb-2 drop-shadow-lg">
                Doris & Emmanuel
              </h1>
              <div className="w-24 h-0.5 bg-gradient-to-r from-rose-400 to-gray-400 mb-4"></div>
              <p className="text-xl md:text-2xl text-rose-50 font-medium">
                Invite you to celebrate their wedding
              </p>
            </div>

            <div className="flex justify-start space-x-4 md:space-x-8 text-white mb-8">
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold">{timeLeft.days}</div>
                <div className="text-md font-medium">Days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold">{timeLeft.hours}</div>
                <div className="text-md font-medium">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold">{timeLeft.minutes}</div>
                <div className="text-md font-medium">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold">{timeLeft.seconds}</div>
                <div className="text-md font-medium">Seconds</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center mb-8">
              <a
                href="/program"
                className="px-8 py-4 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-rose-200 hover:border-rose-300 cursor-pointer"
              >
                Event Program
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="pt-6 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Our Story
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-rose-400 to-gray-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Video and Image Cards Row */}
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative w-full h-80 bg-black rounded-lg overflow-hidden">
                   <video 
                     className="w-full h-full object-contain"
                     controls
                     preload="none"
                     poster="/photos/story/our_story2.jpg"
                     onError={(e) => {
                       const target = e.target as HTMLVideoElement;
                       target.style.display = 'none';
                       const fallback = target.nextElementSibling as HTMLElement;
                       if (fallback) fallback.style.display = 'block';
                     }}
                   >
                     <source src="/photos/story/our_story_video.mp4" type="video/mp4" />
                   </video>
                   <img 
                     src="/photos/story/our_story2.jpg" 
                     alt="Our Story - Click to play video" 
                     className="w-full h-80 object-cover cursor-pointer hidden"
                     style={{ display: 'none' }}
                   />
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <Image
                  src="/photos/story/our_story2.jpg"
                  alt="Our Story - Faith and Love"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Text Cards Row */}
            <div className="bg-gradient-to-br from-rose-50 to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-gray-700 leading-relaxed text-sm">
                <p className="mb-4">
                  From the moment our paths first crossed, it felt like the universe had nudged us together. What began as a simple conversation in a health T.V show on wellness, grew into countless shared moments-coffee dates that turned into hours of laughter, quiet walks where words weren't even necessary, and late-night talks about everything and nothing.
                </p>
                <p className="mb-4">
                  We discovered not just love, but a true friendship, one that carried us through challenges and made the joyful moments shine even brighter. Every day with each other became a reminder that love doesn't have to be complicated-it just has to be true.
                </p>
                <p className="mb-4">
                  Now, standing on the threshold of marriage, we look back at the journey that brought us here with grateful hearts. Every memory, every challenge, every embrace has led to this moment, where we choose each other openly and without hesitation.
                </p>
                <p className="mb-4">
                  We aren't just promising forever-we're celebrating the forever that has already begun. Hand in hand, we're ready to step into this new chapter, knowing that whatever life brings, we'll face it together as partners, as best friends, and as soulmates.
                </p>
                <p className="text-rose-600 font-semibold text-center mt-6">
                  GOD BE OUR HELPER
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-rose-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-gray-700 leading-relaxed text-sm">
                <p className="mb-6 text-lg font-medium text-center">
                  Marriage is truly not an achievement but a fulfillment of purpose.
                </p>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Mark 10:6 - 9</h3>
                  <blockquote className="italic text-gray-600 mb-4">
                    "... At the beginning of creation God made them male and female. For this reason a man will leave his father and mother and be united to his wife, and the two will become one flesh.
                  </blockquote>
                  <p className="font-semibold text-gray-800">
                    Therefore what God has joined together, let no one separate."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 bg-gradient-to-br from-rose-100 via-gray-50 to-rose-50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-32 h-32 bg-rose-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 right-4 w-40 h-40 bg-gray-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-rose-200 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Decorative line */}
          <div className="w-32 h-0.5 bg-gradient-to-r from-rose-400 to-gray-400 mx-auto mb-8"></div>
          
          {/* Main content */}
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              Doris & Emmanuel
            </h3>
            <p className="text-xl text-gray-700 font-medium mb-2">
              {new Date().getFullYear()}
            </p>
            <p className="text-lg text-gray-600 italic max-w-2xl mx-auto leading-relaxed">
              "Thank you for being a part of our journey and for celebrating this special moment with us. Your presence makes our love story complete."
            </p>
          </div>
          
          {/* Social links or contact info */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">With Love</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">November 29, 2025</span>
            </div>
          </div>
          
          {/* Bottom decorative line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-rose-400 to-gray-400 mx-auto"></div>
        </div>
      </footer>
    </div>
  );
}