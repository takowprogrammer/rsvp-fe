"use client";

import { useState } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 8h18v4H3V8Z" />
      <path d="M5 12h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8Z" />
      <path d="M12 4c.5-1.5 3-1.5 3 0s-1.5 3-3 3-3-1.5-3-3 2.5-1.5 3 0Z" />
      <path d="M12 7v15" />
    </svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M6.5 2.75h11a1.75 1.75 0 0 1 1.75 1.75v15a1.75 1.75 0 0 1-1.75 1.75h-11A1.75 1.75 0 0 1 4.75 19.5V4.5A1.75 1.75 0 0 1 6.5 2.75Z" />
      <path d="M9 4.75h6" />
      <path d="M12 18.25h.01" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

const items = [
  "A set of Big wine glasses",
  "A Food Processor",
  "A Mable Dining Table set",
  "A set of none sticky pots",
  "Washing machine",
  "Treadmill",
  "Air Conditioner",
  "A set of classy serving bowls",
  "A set of 0.5L water glass",
  "Classy interior décor accessories",
  "A set of high quality Cotton Towels",
  "Silver crest 800W juicer",
  "A set of plain white cotton Duvet",
  "Aesthetic Wall Clock",
  "Room Dehumidifier",
  "Electronic Wine opener",
  "Artificial Home plants for interior decor, white bucket flowers or a green leafy bucket plant",
  "A Mop bucket set",
  "An 8 piece (2m a piece) Monochromatic color set blinds",
  "A sound Contain Blender",
  "Voltage Regulator",
  "Cash Gift",
];

// Note: getKeywords is not used in the UI. Commented to avoid unused-var during CI builds.
// function getKeywords(label: string) {
//   const l = label.toLowerCase();
//   if (l.includes("food processor")) return "food processor,kitchen,appliance";
//   if (l.includes("wine glass")) return "wine,glasses,set";
//   if (l.includes("dining table")) return "dining,table,set,marble";
//   if (l.includes("sticky pots") || l.includes("non sticky") || l.includes("none sticky")) return "nonstick,cookware,set";
//   if (l.includes("washing machine")) return "washing,machine,laundry";
//   if (l.includes("treadmill")) return "treadmill,home,gym";
//   if (l.includes("air conditioner")) return "air,conditioner,ac";
//   if (l.includes("serving bowls")) return "serving,bowls,ceramic";
//   if (l.includes("0.5l") || l.includes("water glass")) return "drinking,glasses,water";
//   if (l.includes("decor accessories")) return "home,decor,accessories";
//   if (l.includes("cotton towels")) return "cotton,bath,towels";
//   if (l.includes("juicer")) return "juicer,kitchen";
//   if (l.includes("duvet")) return "white,duvet,bed";
//   if (l.includes("wall clock")) return "wall,clock";
//   if (l.includes("dehumidifier")) return "dehumidifier,home";
//   if (l.includes("wine opener")) return "electric,wine,opener";
//   if (l.includes("home plants") || l.includes("bucket flowers") || l.includes("leafy")) return "indoor,plant,white,pot";
//   if (l.includes("mop bucket")) return "mop,bucket,cleaning";
//   if (l.includes("blinds")) return "window,blinds,monochrome";
//   if (l.includes("blender")) return "blender,kitchen";
//   if (l.includes("voltage regulator")) return "voltage,regulator,power,electricity";
//   if (l.includes("cash")) return "cash,gift,envelope";
//   // default: derive tags from words
//   return label
//     .replace(/\b(a|an|the|set|of|for|or|and)\b/gi, " ")
//     .replace(/\s+/g, " ")
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, ",")
//     .replace(/,+/g, ",")
//     .replace(/^,|,$/g, "");
// }

// Return one or more local images for a wishlist label
function getImagesForItem(label: string): string[] {
  const l = label.toLowerCase();
  const base = "/photos/wishlist";
  if (l.includes("wine glass")) return [
    `${base}/set-of-wine-glasses.jpg`,
  ];
  if (l.includes("food processor")) return [
    `${base}/food-processor.jpg`,
  ];
  if (l.includes("dining table") || l.includes("dinning table") || l.includes("mable")) return [
    `${base}/marble-dinning-set.jpeg`,
    `${base}/marble-dinning-set2.jpeg`,
  ];
  if (l.includes("sticky pots") || l.includes("non sticky") || l.includes("none sticky") || l.includes("non-stick")) return [
    `${base}/non-stick-pot-set.jpeg`,
    `${base}/non-stick-pot-set2.jpeg`,
  ];
  if (l.includes("washing machine")) return [
    `${base}/washing-machine.jpeg`,
    `${base}/washing-machine2.jpeg`,
  ];
  if (l.includes("treadmill")) return [
    `${base}/treadmill.jpeg`,
  ];
  if (l.includes("air conditioner")) return [
    `${base}/air-conditioner.jpeg`,
  ];
  if (l.includes("serving bowls")) return [
    `${base}/set-of-serving-bowls.jpeg`,
    `${base}/set-of-serving-bowls2.jpeg`,
  ];
  if (l.includes("0.5l") || l.includes("water glass")) return [
    `${base}/set-of-water-glasses.jpeg`,
    `${base}/set-of-water-glasses2.jpeg`,
  ];
  if (l.includes("classy interior décor accessories") || l.includes("classy interior decor accessories")) return [
    `${base}/internal-decor-accessories.jpeg`,
    `${base}/internal-decor-accessories.jpg`,
    `${base}/internal-decor-accessories1.jpg`,
    `${base}/internal-decor-accessories2.jpg`,
    `${base}/internal-decor-accessories3.jpg`,
    `${base}/internal-decor-accessories4.jpg`,
    `${base}/internal-decor-accessories5.jpg`,
  ];
  if (l.includes("d 9cor accessories") || l.includes("decor accessories") || l.includes("interior decor")) return [
    `${base}/internal-decor-accessories.jpeg`,
    `${base}/internal-decor-accessories.jpg`,
    `${base}/internal-decor-accessories1.jpg`,
    `${base}/internal-decor-accessories2.jpg`,
  ];
  if (l.includes("cotton towels")) return [
    `${base}/cotton-towel.jpg`,
    `${base}/cotton-towel1.jpg`,
    `${base}/cotton-towel2.jpg`,
  ];
  if (l.includes("juicer")) return [
    `${base}/silver-crest-800w-juicer.jpeg`,
  ];
  if (l.includes("duvet")) return [
    `${base}/white-cotton-duvet.jpeg`,
  ];
  if (l.includes("wall clock")) return [
    `${base}/wall-clock.jpg`,
    `${base}/wall-clock1.jpg`,
    `${base}/wall-clock2.jpg`,
    `${base}/wall-clock3.jpg`,
  ];
  if (l.includes("dehumidifier")) return [
    `${base}/room-humidifier.jpeg`,
  ];
  if (l.includes("wine opener")) return [
    `${base}/electric-wine-opener.jpeg`,
    `${base}/electric-wine-opener2.jpeg`,
    `${base}/electronic-wine-opener2.jpeg`,
  ];
  if (l.includes("home plants") || l.includes("bucket flowers") || l.includes("leafy")) return [
    `${base}/internal-decor-accessories.jpeg`,
  ];
  if (l.includes("mop bucket")) return [
    `${base}/mob-bucket-set.jpeg`,
    `${base}/mob-bucket-set2.jpeg`,
  ];
  if (l.includes("blinds")) return [
    `${base}/monochrome-window-blinds.jpeg`,
  ];
  if (l.includes("blender")) return [
    `${base}/sound-contain-blender.jpeg`,
    `${base}/sound-contain-blender1.jpeg`,
  ];
  if (l.includes("cash")) return [
    `${base}/cash-gift.jpeg`,
    `${base}/cash-gift2.jpeg`,
  ];
  if (l.includes("voltage regulator")) return [
    `${base}/voltage-regulator.jpeg`,
    `${base}/voltage-regulator2.jpeg`,
  ];
  // Fallback (local, exists)
  return ["/photos/story/story3.jpg"];
}

export default function WishlistPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<{ src: string }[]>([]);

  const handleImageClick = (itemImages: string[], imageIndex: number) => {
    setSlides(itemImages.map((src) => ({ src })));
    setIndex(imageIndex);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50">
      <Navbar />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />

      {/* Full-bleed hero */}
      <section className="relative h-[80vh] sm:h-[85vh] md:h-[100vh] w-full overflow-hidden mb-8 sm:mb-12 pt-20">
        <Image
          src="/photos/story/story3.jpg"
          alt="Gift Registry"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 sm:px-6 pb-8 sm:pb-10 md:pb-14">
          <h1 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-semibold text-white drop-shadow-xl leading-tight`}>Gift Registry</h1>
          <p className="mt-3 max-w-3xl text-sm sm:text-base md:text-lg text-rose-50/95 leading-relaxed font-medium drop-shadow-lg">
            Most often couples receive gift that they end up not using or gift it to others cause it does not suit their home or they already have one too many. This Gift idea is to guide our guest as to what they can gift us that will be of great use to us with immense gratitude. See the items below.
          </p>
          <a href="#items" aria-label="See items below" className="mt-3 sm:mt-4 inline-flex items-center justify-center text-white/90 hover:text-white transition">
            <svg className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Items */}
        <section id="items" className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md border border-rose-200/40 p-4 sm:p-6 md:p-10">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-5">Items</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {items.map((label, idx) => {
              const images = getImagesForItem(label);
              const isCash = label.toLowerCase().includes("cash");
              const hasSlides = images.length > 1;
              const totalDur = `${images.length * 4}s`;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl bg-white/90 border border-rose-200/40 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[4/3] bg-rose-50">
                    {hasSlides ? (
                      <>
                        {images.map((src, i) => (
                          <Image
                            key={i}
                            src={src}
                            alt={`${label} ${i + 1}`}
                            fill
                            className="object-cover wishlist-slideshow-slide cursor-pointer"
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            loading="lazy"
                            style={{ animationDelay: `${i * 4}s`, animationDuration: totalDur }}
                            onClick={() => handleImageClick(images, i)}
                          />
                        ))}
                      </>
                    ) : (
                      <Image
                        src={images[0]}
                        alt={label}
                        fill
                        className="object-cover cursor-pointer"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        loading="lazy"
                        onClick={() => handleImageClick(images, 0)}
                      />
                    )}
                    <span className="absolute top-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-dusty-blue-600 ring-1 ring-dusty-blue-200">
                      {isCash ? <HeartIcon className="h-5 w-5" /> : <GiftIcon className="h-5 w-5" />}
                    </span>
                  </div>
                  <div className="p-2 sm:p-3">
                    <p className="text-[10px] sm:text-[11px] text-gray-500">Item {idx + 1}</p>
                    <h3 className="font-medium text-gray-800 leading-snug text-xs sm:text-sm">{label}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact */}
          <div className="mt-8 sm:mt-10 rounded-2xl bg-rose-50/80 border border-rose-200 p-4 sm:p-5 md:p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white text-rose-600 ring-1 ring-rose-200 flex-shrink-0">
                <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="text-gray-800">
                <p className="text-sm sm:text-base">
                  You can contact <span className="font-semibold">650417134 (Lilian Vanessa)</span> to aid you with a gift choice and where you can purchase. Contacting this number will also help you know if a gift has been bought already by another person or if it&apos;s still open.
                </p>
                <p className="mt-2 sm:mt-3 text-rose-700 font-medium text-sm sm:text-base">NB: Cash Gift is always open in case the others are closed.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}