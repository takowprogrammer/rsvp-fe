import { Metadata } from 'next';
import Link from 'next/link';
import SmartImage from '@/components/SmartImage';
import InvitationClient from './InvitationClient';

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

// Generate metadata for link previews
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/invitations/${params.id}`, {
      cache: 'no-store' // Ensure fresh data for each request
    });

    if (!response.ok) {
      return {
        title: 'Wedding Invitation - Doris & Emmanuel',
        description: 'You\'re invited to our special day!',
      };
    }

    const invitation: Invitation = await response.json();
    
    // Get the image URL for the preview
    const getImageUrl = (imageUrl?: string): string => {
      if (!imageUrl) return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/photos/gallery/IMG-20250905-WA0021.jpg`;
      
      if (imageUrl.startsWith('/invitations/')) {
        const filename = imageUrl.replace('/invitations/', '');
        return `${backendUrl}/api/invitations/image/${filename}`;
      }
      
      return imageUrl;
    };

    const previewImage = getImageUrl(invitation.imageUrl);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const invitationUrl = `${siteUrl}/invitation/${params.id}`;

    return {
      title: `Wedding Invitation - Doris & Emmanuel`,
      description: invitation.message?.substring(0, 160) || 'You\'re invited to our special day!',
      openGraph: {
        title: `Wedding Invitation - Doris & Emmanuel`,
        description: invitation.message?.substring(0, 160) || 'You\'re invited to our special day!',
        url: invitationUrl,
        siteName: 'Doris & Emmanuel Wedding',
        images: [
          {
            url: previewImage,
            width: 1200,
            height: 630,
            alt: 'Wedding Invitation',
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Wedding Invitation - Doris & Emmanuel`,
        description: invitation.message?.substring(0, 160) || 'You\'re invited to our special day!',
        images: [previewImage],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Wedding Invitation - Doris & Emmanuel',
      description: 'You\'re invited to our special day!',
    };
  }
}

// Server-side component that fetches invitation data
export default async function InvitationPage({ params }: { params: { id: string } }) {
  let invitation: Invitation | null = null;
  let error: string | null = null;

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/invitations/${params.id}`, {
      cache: 'no-store' // Ensure fresh data for each request
    });

    if (!response.ok) {
      if (response.status === 404) {
        error = 'Invitation not found';
      } else {
        error = 'Failed to load invitation';
      }
    } else {
      invitation = await response.json();
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Something went wrong';
  }

  // Helper function to get the correct image URL
  const getImageUrl = (imageUrl?: string): string => {
    if (!imageUrl) return '';

    // If it's already an API URL, return as is
    if (imageUrl.startsWith('/api/invitations/image/')) {
      return imageUrl;
    }

    // If it's a static path like /invitations/filename.jpg, convert to API URL
    if (imageUrl.startsWith('/invitations/')) {
      const filename = imageUrl.replace('/invitations/', '');
      return `/api/invitations/image/${filename}`;
    }

    // For any other format, return as is
    return imageUrl;
  };

  return (
    <InvitationClient 
      invitation={invitation} 
      error={error} 
      getImageUrl={getImageUrl}
    />
  );
}