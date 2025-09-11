'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Invitation {
  id: string;
  templateName: string;
  title: string;
  message: string;
  imageUrl?: string;
  buttonText: string;
  formUrl: string;
}

export default function InvitationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isPreview = searchParams?.get('preview') === '1';

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false); // Start closed; click to open

  useEffect(() => {
    const id = params?.id?.toString?.() || '';
    if (!id) return;

    if (isPreview) {
      setInvitation({
        id,
        templateName: 'classic',
        title: 'You Are Cordially Invited',
        message:
          'Join us as we celebrate together.',
        imageUrl: '/invitations/wedding_invitation_improved_4.png',
        buttonText: 'RSVP Now',
        formUrl: '/rsvp',
      });
      setError('');
      setLoading(false);
      return;
    }

    const fetchInvitation = async () => {
      try {
        const res = await fetch(`/api/invitations/${id}`);
        if (!res.ok) throw new Error('Invitation not found');
        const data = await res.json();
        setInvitation(data);
        setError('');
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to load invitation';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [params, isPreview]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-rose-50 p-4">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
          <p className="text-slate-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-rose-50 p-4">
        <div className="max-w-md w-full text-center bg-white/80 backdrop-blur rounded-xl p-6 shadow">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-xl">✕</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-1">Invitation Not Found</h2>
          <p className="text-slate-600 mb-4">{error || "The invitation you're looking for doesn't exist."}</p>
          <Link href="/" className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-rose-50 p-2 sm:p-4 relative overflow-hidden">
      {/* Envelope Container */}
      <div
        className="relative w-full cursor-pointer group max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close invitation' : 'Open invitation'}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((v) => !v);
          }
        }}
        onClick={() => setIsOpen((v) => !v)}
        style={{ perspective: '1200px' }}
      >
        {/* Depth shadow */}
        <div className="absolute inset-0 rounded-3xl translate-y-3 translate-x-2 blur-2xl bg-black/10 pointer-events-none" />

        {/* Main Envelope */}
        <div className="relative rounded-3xl shadow-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-visible min-h-[36rem] sm:min-h-[44rem] md:min-h-[52rem] lg:min-h-[60rem]">
          {/* Flap */}
          <div
            className="absolute left-0 right-0 top-0 h-20 sm:h-24 md:h-28 lg:h-32 transition-transform duration-700 ease-in-out"
            style={{ transformOrigin: 'top', transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
          >
            <div
              className="w-full h-full shadow-md"
              style={{
                background: 'linear-gradient(135deg, rgb(163,196,228), rgb(122,165,201))',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
              }}
            />
          </div>

          {/* Click-to-open hint */}
          {!isOpen && (
            <div
              className="absolute inset-x-0 top-16 sm:top-20 md:top-24 lg:top-28 z-20 flex justify-center pointer-events-none"
              aria-hidden="true"
            >
              <div className="pointer-events-none flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium text-white shadow-lg ring-1 ring-white/40 bg-gradient-to-r from-sky-600 to-amber-500 opacity-95 translate-y-0 group-hover:-translate-y-0.5 group-hover:shadow-xl transition-all duration-300">
                <span>Click to open</span>
                <span className="text-white/90 animate-bounce">▼</span>
              </div>
            </div>
          )}

          {/* Decorative band under flap */}
          <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 py-3 sm:py-4">
            <div className="border-t-2 border-b-2 border-slate-200 py-2">
              <div className="flex justify-center gap-2 text-slate-400">
                <div className="w-2 h-2 bg-sky-300 rounded-full" />
                <div className="w-2 h-2 bg-amber-300 rounded-full" />
                <div className="w-2 h-2 bg-sky-300 rounded-full" />
                <div className="w-2 h-2 bg-amber-300 rounded-full" />
                <div className="w-2 h-2 bg-sky-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* Side flaps */}
          <div className="absolute left-0 right-0 top-20 sm:top-24 md:top-28 lg:top-32 bottom-12 sm:bottom-14 md:bottom-16 lg:bottom-20 pointer-events-none">
            <div
              className="absolute left-0 top-0 h-full w-1/2 opacity-90"
              style={{
                background: 'linear-gradient(135deg, rgb(242,232,218), rgb(255,255,255), rgb(230,238,246))',
                clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              }}
            />
            <div
              className="absolute right-0 top-0 h-full w-1/2 opacity-90"
              style={{
                background: 'linear-gradient(225deg, rgb(242,232,218), rgb(255,255,255), rgb(230,238,246))',
                clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
              }}
            />
          </div>

          {/* Image with elegant frame (no cropping) */}
          {invitation.imageUrl ? (
            <div
              className="relative z-10 mx-3 sm:mx-4 md:mx-6 mt-2 mb-0 transition-all duration-700"
              style={{
                transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.98)',
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
              }}
            >
              <div className="relative rounded-2xl overflow-visible shadow-lg border-4 border-white">
                <img
                  src={invitation.imageUrl}
                  alt="Invitation"
                  className="w-full h-auto object-contain max-h-64 sm:max-h-80 md:max-h-[28rem] lg:max-h-[36rem]"
                />

                {/* RSVP overlay button */}
                <div className="absolute inset-x-0 -bottom-5 flex justify-center">
                  <Link
                    href={invitation.formUrl}
                    className="bg-gradient-to-r from-sky-600 to-amber-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-sky-700 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-xl border-2 border-white/40"
                  >
                    {invitation.buttonText}
                  </Link>
                </div>

                {/* Corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/60 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/60 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/60 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/60 rounded-br-lg" />
              </div>
            </div>
          ) : null}

          {/* Content */}
          <div
            className="relative z-10 px-4 sm:px-6 md:px-8 pb-1 sm:pb-2 md:pb-4 text-center transition-all duration-500"
            style={{
              transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
              <div className="mx-4 text-sky-400 text-2xl">❦</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-sky-800 via-sky-600 to-amber-600 bg-clip-text text-transparent leading-tight">
              {invitation.title}
            </h1>

            {invitation.message ? (
              <p className="mt-3 text-slate-700 font-serif whitespace-pre-line">
                {invitation.message}
              </p>
            ) : null}

            {/* Fallback CTA if image missing */}
            {!invitation.imageUrl ? (
              <div className="mt-4">
                <Link
                  href={invitation.formUrl}
                  className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors shadow"
                >
                  {invitation.buttonText || 'RSVP'}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}