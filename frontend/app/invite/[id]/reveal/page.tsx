"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function InvitationRevealPage() {
    const params = useParams();
    const { id } = params;
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchInvitationHtml = async () => {
            setLoading(true);
            try {
                // Use the new API route that proxies the backend HTML
                const response = await fetch(`/api/invitations/${id}/reveal`);

                if (!response.ok) {
                    throw new Error('Failed to load invitation. It might not exist or has been removed.');
                }

                const html = await response.text();
                setHtmlContent(html);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchInvitationHtml();
    }, [id]);

    if (loading) {
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
                    <a href="/" className="px-6 py-2 bg-dusty-blue-600 text-white rounded-lg hover:bg-dusty-blue-700 transition-colors">
                        Go to Homepage
                    </a>
                </div>
            </div>
        );
    }

    // Render the HTML content fetched from the backend
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
