"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-dusty-blue-50 to-nude-50 py-8 px-4 border-t border-dusty-blue-200">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 font-serif">
            Thank You
          </h3>
          <p className="text-gray-600 mb-4 font-serif italic">
            We are grateful for your presence as we celebrate this special day
            together.
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
            <span className="font-serif">
              For Updates Contact Sen Nadine (+237)674958851
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}