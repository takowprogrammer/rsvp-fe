"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function InvitationRevealPage() {
    const params = useParams();
    const { id } = params;
    // We no longer need to fetch the HTML content here,
    // as the iframe will handle it directly.
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [iframeSrc, setIframeSrc] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            // Check if the invitation exists before setting the iframe src
            const verifyInvitation = async () => {
                try {
                    // We can just hit the reveal endpoint and check for a 200 OK
                    const response = await fetch(`/api/invitations/${id}/reveal`);
                    if (!response.ok) {
                        throw new Error('Invitation not found or an error occurred.');
                    }
                    // If it's okay, set the source for the iframe
                    setIframeSrc(`/api/invitations/${id}/reveal`);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                } finally {
                    setIsLoading(false);
                }
            };
            verifyInvitation();
        } else {
            setIsLoading(false);
            setError("No invitation ID provided.");
        }
    }, [id]);


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dusty-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Preparing your invitation...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link href="/" className="px-6 py-2 bg-dusty-blue-600 text-white rounded-lg hover:bg-dusty-blue-700 transition-colors">
                        Go to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    // Render an iframe that securely loads the envelope HTML.
    // This ensures all scripts and styles are executed correctly.
    return (
        <iframe
            src={iframeSrc || ''}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
            }}
            title="Invitation Envelope"
        />
    );
}
