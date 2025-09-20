"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import SmartImage from "@/components/SmartImage";

interface Invitation {
  id: string;
  templateName: string;
  title: string;
  message: string;
  imageUrl?: string;
  buttonText: string;
  formUrl?: string;
  isActive: boolean;
  createdAt: string;
}

const InvitationPage: React.FC = () => {
  const params = useParams();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const res = await fetch(`/api/invitations/${params.id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Invitation not found");
          } else {
            setError("Failed to load invitation");
          }
          return;
        }
        const data = await res.json();
        setInvitation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchInvitation();
    }
  }, [params.id]);

  const handleRSVP = () => {
    if (invitation?.formUrl) {
      window.open(invitation.formUrl, '_blank');
    } else {
      // Default RSVP form
      window.location.href = '/rsvp';
    }
  };

  // Helper function to get the correct image URL
  const getImageUrl = (imageUrl?: string): string => {
    if (!imageUrl) return '';

    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    // If it's a static path like /invitations/filename.jpg, use backend API URL
    if (imageUrl.startsWith('/invitations/')) {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const filename = imageUrl.replace('/invitations/', '');
      return `${backendUrl}/api/invitations/image/${filename}`;
    }

    // For any other format, return as is
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dusty-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invitation Not Found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/" className="text-dusty-blue-600 hover:underline">Go to Home</Link>
        </div>
      </div>
    );
  }

  if (!invitation.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Invitation Inactive</h1>
          <p className="text-gray-600">This invitation is no longer active.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-dusty-blue-500 to-dusty-blue-600 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">{invitation.title}</h1>
            <p className="text-lg opacity-90">You&apos;re Invited!</p>
          </div>

          {/* Image */}
          {invitation.imageUrl ? (
            <div className="relative">
              <SmartImage
                src={getImageUrl(invitation.imageUrl)}
                alt={invitation.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                }}
              />
            </div>
          ) : (
            <div className="relative h-64 bg-gradient-to-br from-dusty-blue-100 to-dusty-blue-200 flex items-center justify-center">
              <div className="text-center text-dusty-blue-600">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium">Wedding Invitation</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {invitation.message}
              </p>
            </div>

            {/* RSVP Button */}
            <div className="text-center">
              <button
                onClick={handleRSVP}
                className="bg-gradient-to-r from-dusty-blue-500 to-dusty-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-dusty-blue-600 hover:to-dusty-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {invitation.buttonText}
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>We can&apos;t wait to celebrate with you! 💕</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationPage;
