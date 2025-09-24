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

  // Responsive object positions for different orientations
  const getObjectPosition = (idx: number, isPortrait: boolean, isMobile: boolean) => {
    const basePositions = [
      "center top", // For crop1.jpg - show heads at top
      "center top", // For crop2.jpg - show heads at top
      "center top", // For crop3.jpg - show heads at top
      "center top", // For crop4.jpg - show heads at top
      "center top", // For crop5.jpg - show heads at top
      "center top", // For crop6.jpg - show heads at top
      "center top", // For crop8.jpg - show heads at top
    ];

    if (isMobile && isPortrait) {
      // In mobile portrait mode, center the image to show the complete picture
      return basePositions[idx] || "center top";
    }

    return basePositions[idx] || "center";
  };

  // Get object fit based on orientation - use object-contain for mobile to show full image
  const getObjectFit = (isPortrait: boolean, isMobile: boolean) => {
    if (isMobile && isPortrait) {
      return "object-contain";
    }
    return "object-cover";
  };

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();

    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // Handle orientation and screen size detection
  useEffect(() => {
    const checkOrientation = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      const isMobileDevice = window.innerWidth < 768;
      setIsPortrait(isPortraitMode);
      setIsMobile(isMobileDevice);
    };

    // Check on mount
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

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
    <div className="bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 font-sans">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-dusty-blue-200/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="px-3 py-2 rounded-md text-dusty-blue-700 font-semibold bg-dusty-blue-50 ring-1 ring-dusty-blue-200 text-sm sm:text-base">Home</Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link href="/gallery" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium text-sm lg:text-base">Gallery</Link>
              <Link href="/wedding-party" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium text-sm lg:text-base">Wedding Party</Link>
              <Link href="/planning-team" className="px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium text-sm lg:text-base">Planning Team</Link>
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
                  href="/planning-committee"
                  className="block px-3 py-2 rounded-md text-gray-600 hover:text-dusty-blue-700 hover:bg-dusty-blue-50 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Planning Committee
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

      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          marginTop: "64px",
          height: "calc(var(--vh, 1vh) * 100 - 64px)",
        }}
      >
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
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? "opacity-100" : "opacity-0"}`}
          >
            {/* Background blurred image */}
            <Image
              src={src}
              alt=""
              fill
              className="object-cover blur-xl scale-110"
              quality={50}
              aria-hidden="true"
            />
            {/* Foreground image */}
            <div className={`relative w-full h-full`}>
              <Image
                src={src}
                alt="Wedding invitation background"
                fill
                className={`transition-transform duration-[20000ms] ease-linear hover:scale-105 ${getObjectFit(isPortrait && isMobile, isMobile)}`}
                style={{
                  objectPosition: getObjectPosition(idx, isPortrait && isMobile, isMobile)
                }}
                priority={idx === 0}
                quality={isMobile ? 75 : 90}
                sizes={isMobile ? "(max-width: 768px) 100vw, 50vw" : "100vw"}
                onLoad={() => idx === 0 && setImagesLoaded(true)}
              />
            </div>
          </div>
        ))}
        {/* Hero overlay: Couple names */}
        <div className="absolute inset-0 z-20 pointer-events-none h-full flex flex-col items-center justify-center md:justify-end md:pb-48 text-center px-4">
          <div className="rounded-2xl bg-black/35 md:bg-black/25 text-white backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 w-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif leading-tight">Doris & Emmanuel</h1>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wider text-white/90 mt-2">
              #Emmaris25
            </p>
          </div>
        </div>
      </div>

      {/* Removed first Our Story section as requested */}
      {/* Our Story */}
      <section id="our-story" className="px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center font-serif">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Card 1: Video + Text */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-dusty-blue-200/40 p-3 sm:p-4">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                <video controls preload="metadata" playsInline className="absolute inset-0 w-full h-full object-contain" poster="/photos/story/story_poster.jpg">
                  <source src="/photos/story/our_story_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="text-gray-600 text-sm sm:text-base italic leading-normal mt-3 sm:mt-4 space-y-3 sm:space-y-4 font-playfair-display">
                <p>{`From the moment our paths first crossed, it felt like the universe had nudged us together. What began as a simple conversation in a health T.V show on wellness, grew into countless shared moments—coffee dates that turned into hours of laughter, quiet walks where words weren't even necessary, and late-night talks about everything and nothing. We discovered not just love, but a true friendship, one that carried us through challenges and made the joyful moments shine even brighter. Every day with each other became a reminder that love doesn't have to be complicated-it just has to be true.`}</p>
                <p>{`Now, standing on the threshold of marriage, we look back at the journey that brought us here with grateful hearts. Every memory, every challenge, every embrace has led to this moment, where we choose each other openly and without hesitation. We aren't just promising forever-we're celebrating the forever that has already begun. Hand in hand, we're ready to step into this new chapter, knowing that whatever life brings, we'll face it together as partners, as best friends, and as soulmates.`}</p>
                <p className="font-great-vibes text-sm sm:text-base">{`GOD BE OUR HELPER`}</p>
              </div>
            </div>

            {/* Card 2: Image + Scripture Text */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-dusty-blue-200/40 p-3 sm:p-4">
              <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden">
                <Image
                  src="/photos/story/story_card.jpg"
                  alt="Story photo"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 40%' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="text-gray-600 text-sm sm:text-base italic leading-normal mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                <p className="font-playfair-display">{`Marriage is truly not an achievement but a fulfillment of purpose.`}</p>
                <p className="font-great-vibes text-xs sm:text-sm">{`Mark 10:6 - 9 " ... At the beginning off creation God made them male and female." for this reason a man will leave his father and mother and be united to his wife, and the two will become one flesh. Therefore what God has joint together, let no one Seperate.`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Countdown */}
      <section id="countdown" className="px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-md border border-dusty-blue-200/40 p-4 sm:p-6 md:p-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 font-serif">Countdown to Our Big Day</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl bg-dusty-blue-50 text-dusty-blue-800 p-4 sm:p-6 border border-dusty-blue-200">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{Math.max(0, timeLeft.days)}</div>
              <div className="text-xs sm:text-sm mt-1 font-medium">Days</div>
            </div>
            <div className="rounded-2xl bg-dusty-blue-50 text-dusty-blue-800 p-4 sm:p-6 border border-dusty-blue-200">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{Math.max(0, timeLeft.hours)}</div>
              <div className="text-xs sm:text-sm mt-1 font-medium">Hours</div>
            </div>
            <div className="rounded-2xl bg-dusty-blue-50 text-dusty-blue-800 p-4 sm:p-6 border border-dusty-blue-200">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{Math.max(0, timeLeft.minutes)}</div>
              <div className="text-xs sm:text-sm mt-1 font-medium">Minutes</div>
            </div>
            <div className="rounded-2xl bg-dusty-blue-50 text-dusty-blue-800 p-4 sm:p-6 border border-dusty-blue-200">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{Math.max(0, timeLeft.seconds)}</div>
              <div className="text-xs sm:text-sm mt-1 font-medium">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Explore */}
      <section id="explore" className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Link href="/program" className="group rounded-2xl bg-white/90 border border-dusty-blue-200/60 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
            <div className="text-2xl sm:text-3xl mb-3">🗓️</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">View Program</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">See the schedule for our special day.</p>
            <span className="mt-3 sm:mt-4 inline-block px-3 py-2 rounded-md bg-dusty-blue-50 text-dusty-blue-700 ring-1 ring-dusty-blue-200 group-hover:bg-dusty-blue-100 transition text-sm">Open Program →</span>
          </Link>
          <Link href="/gallery" className="group rounded-2xl bg-white/90 border border-dusty-blue-200/60 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
            <div className="text-2xl sm:text-3xl mb-3">📷</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Explore Gallery</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Browse lovely photos and memories.</p>
            <span className="mt-3 sm:mt-4 inline-block px-3 py-2 rounded-md bg-dusty-blue-50 text-dusty-blue-700 ring-1 ring-dusty-blue-200 group-hover:bg-dusty-blue-100 transition text-sm">Open Gallery →</span>
          </Link>
          <Link href="/wishlist" className="group rounded-2xl bg-white/90 border border-dusty-blue-200/60 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
            <div className="text-2xl sm:text-3xl mb-3">🎁</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Gift Registry</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Find gift ideas we would truly cherish.</p>
            <span className="mt-3 sm:mt-4 inline-block px-3 py-2 rounded-md bg-dusty-blue-50 text-dusty-blue-700 ring-1 ring-dusty-blue-200 group-hover:bg-dusty-blue-100 transition text-sm">See Wishlist →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}