import { Metadata } from 'next';
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
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    
    // For now, return static metadata to avoid server-side fetch issues
    // TODO: Implement proper server-side data fetching
    return {
      title: 'Wedding Invitation - Doris & Emmanuel',
      description: 'You\'re invited to our special day!',
      openGraph: {
        title: 'Wedding Invitation - Doris & Emmanuel',
        description: 'You\'re invited to our special day!',
        url: `https://emmaris25.com/invitation/${id}`,
        siteName: 'Doris & Emmanuel Wedding',
        images: [
          {
            url: 'https://emmaris25.com/photos/gallery/IMG-20250905-WA0021.jpg',
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
        title: 'Wedding Invitation - Doris & Emmanuel',
        description: 'You\'re invited to our special day!',
        images: ['https://emmaris25.com/photos/gallery/IMG-20250905-WA0021.jpg'],
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

// Server-side component that passes the invitation ID to the client
export default async function InvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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
      invitationId={id}
      getImageUrl={getImageUrl}
    />
  );
}