'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Invitation {
  id: string;
  templateName: string;
  title: string;
  message: string;
  imageUrl?: string;
  buttonText: string;
  formUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationClientProps {
  invitation: Invitation | null;
  error: string | null;
  getImageUrl: (imageUrl?: string) => string;
}

export default function InvitationClient({ invitation, error, getImageUrl }: InvitationClientProps) {
  const searchParams = useSearchParams();
  const isPreview = searchParams?.get('preview') === '1';
  const [showFullImage, setShowFullImage] = useState(false);

  // Handle escape key to close full image
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showFullImage) {
        setShowFullImage(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showFullImage]);

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="text-red-600 text-6xl mb-4">💔</div>
            <h1 className="text-xl font-semibold text-red-800 mb-2">Invitation Not Found</h1>
            <p className="text-red-600 mb-4">{error || 'This invitation could not be found.'}</p>
            <Link 
              href="/" 
              className="inline-block bg-dusty-blue-600 text-white px-6 py-2 rounded-lg hover:bg-dusty-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!invitation.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="text-yellow-600 text-6xl mb-4">⏰</div>
            <h1 className="text-xl font-semibold text-yellow-800 mb-2">Invitation Not Available</h1>
            <p className="text-yellow-600 mb-4">This invitation is not currently active.</p>
            <Link 
              href="/" 
              className="inline-block bg-dusty-blue-600 text-white px-6 py-2 rounded-lg hover:bg-dusty-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dusty-blue-800 mb-2 font-serif">
            {invitation.title}
          </h1>
          {isPreview && (
            <p className="text-sm text-dusty-blue-600 bg-dusty-blue-100 px-3 py-1 rounded-full inline-block">
              Preview Mode
            </p>
          )}
        </div>

        {/* Invitation Container */}
        <div className="max-w-4xl mx-auto">
          {/* Full Image Modal */}
          {showFullImage && invitation.imageUrl && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2"
              onClick={() => setShowFullImage(false)}
            >
              <div className="relative max-w-[95vw] max-h-[95vh] mx-auto bg-white rounded-xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={getImageUrl(invitation.imageUrl)}
                    alt={invitation.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <button
                  onClick={() => setShowFullImage(false)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                  aria-label="Close image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* RSVP button overlay */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center z-10">
                  <Link
                    href={`/rsvp?invitation=${invitation.id}`}
                    className="bg-gradient-to-r from-dusty-blue-600 to-dusty-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:from-dusty-blue-700 hover:to-dusty-blue-800 transform hover:scale-105 transition-all duration-300 shadow-xl border-2 border-white/40"
                  >
                    {invitation.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Envelope Container */}
          <div
            className="relative w-full cursor-pointer group max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
            aria-expanded={showFullImage}
            aria-label={showFullImage ? 'Close invitation' : 'Open invitation'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowFullImage((v) => !v);
              }
            }}
            onClick={() => setShowFullImage(true)}
            style={{ perspective: '1200px' }}
          >
            {/* Depth shadow */}
            <div className="absolute inset-0 rounded-3xl translate-y-3 translate-x-2 blur-2xl bg-black/10 pointer-events-none" />

            {/* Main Envelope */}
            <div className="relative rounded-3xl shadow-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-visible min-h-[24rem] sm:min-h-[28rem] md:min-h-[32rem] lg:min-h-[36rem]">
              {/* Flap */}
              <div
                className={`absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-br from-dusty-blue-100 to-dusty-blue-200 rounded-t-3xl border-b border-dusty-blue-300/30 transition-transform duration-700 ease-out ${
                  showFullImage ? 'rotate-x-180' : 'group-hover:rotate-x-12'
                }`}
                style={{ transformOrigin: 'top center' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-dusty-blue-300 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dusty-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Envelope Body */}
              <div className="pt-16 sm:pt-20 p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-dusty-blue-800 mb-2 font-serif">
                    {invitation.title}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-dusty-blue-400 to-nude-400 mx-auto rounded-full"></div>
                </div>

                {/* Invitation Image */}
                {invitation.imageUrl && (
                  <div className="mb-6 sm:mb-8">
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={getImageUrl(invitation.imageUrl)}
                        alt={invitation.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                )}

                {/* Message Preview */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {invitation.message}
                  </p>
                </div>

                {/* Click to Open Hint */}
                <div className="text-center">
                  <div className="inline-flex items-center text-dusty-blue-600 text-sm font-medium bg-dusty-blue-50 px-4 py-2 rounded-full">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Click to open invitation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RSVP Section */}
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href={`/rsvp?invitation=${invitation.id}`}
              className="inline-block bg-gradient-to-r from-dusty-blue-600 to-dusty-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-dusty-blue-700 hover:to-dusty-blue-800 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              {invitation.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
