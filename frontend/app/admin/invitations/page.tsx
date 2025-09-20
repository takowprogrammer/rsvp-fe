'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SmartImage from '@/components/SmartImage';

interface Invitation {
    id: string;
    title: string;
    templateName: string;
    message: string;
    imageUrl: string;
    buttonText: string;
    formUrl: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
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

export default function InvitationsPage() {
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Get token from cookie instead of localStorage
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('admin_token='))
            ?.split('=')[1];

        if (!token) {
            router.push('/admin/login');
            return;
        }

        // Check if token is valid
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            if (!payload.exp || payload.exp <= currentTime) {
                document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                router.push('/admin/login');
                return;
            }
        } catch {
            document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            router.push('/admin/login');
            return;
        }

        fetchData(token);
    }, [router]);

    const fetchData = async (token: string) => {
        try {
            // Use the local API endpoint that will forward to the backend
            const response = await fetch('/api/invitations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include' // Include cookies in the request
            });

            if (!response.ok) {
                if (response.status === 401) {
                    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    router.push('/admin/login');
                    return;
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to fetch invitations');
            }

            const data = await response.json();
            setInvitations(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this invitation?')) {
            return;
        }

        try {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('admin_token='))
                ?.split('=')[1];

            if (!token) {
                router.push('/admin/login');
                return;
            }

            // Use the local API endpoint that will forward to the backend
            const response = await fetch(`/api/invitations?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to delete invitation');
            }

            setInvitations(invitations.filter(inv => inv.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const shareViaWhatsApp = (invitation: Invitation) => {
        const invitationUrl = `${window.location.origin}/invite/${invitation.id}`;
        const message = `🎉 ${invitation.title}\n\n${invitation.message}\n\nClick here to RSVP: ${invitationUrl}\n\nWe can't wait to celebrate with you! 💕`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            {/* Loading state */}
            {loading ? (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50">
                    <div className="p-8 border border-dusty-blue-200 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl">
                        <div className="flex items-center space-x-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dusty-blue-600"></div>
                            <p className="text-lg font-medium text-gray-600">Loading invitations...</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 p-6 md:p-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Wedding Invitations</h1>
                                <p className="text-gray-600 mt-2">Manage all your wedding invitations</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Link
                                    href="/admin/invitations/new"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-dusty-blue-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create New Invitation
                                </Link>
                            </div>
                        </div>

                        {/* Back to Dashboard Link */}
                        <div className="mb-8">
                            <Link href="/admin" className="text-dusty-blue-600 hover:text-dusty-blue-800 font-medium inline-flex items-center">
                                ← Back to Dashboard
                            </Link>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {invitations.map((invitation) => (
                                <div key={invitation.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-dusty-blue-200/20 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                    {/* Invitation Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <SmartImage
                                            src={getImageUrl(invitation.imageUrl)}
                                            alt={invitation.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/placeholder-image.png';
                                            }}
                                        />
                                        <div className="absolute top-2 right-2">
                                            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${invitation.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {invitation.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Invitation Content */}
                                    <div className="p-2">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate">{invitation.title}</h3>
                                        <p className="text-gray-600 text-xs mb-1 line-clamp-1">{invitation.message}</p>
                                        <p className="text-dusty-blue-600 text-xs mb-1">Template: {invitation.templateName}</p>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-gray-500">
                                                Created: {new Date(invitation.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="flex gap-1 justify-end">
                                            <button
                                                onClick={() => shareViaWhatsApp(invitation)}
                                                className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-0.5 px-2 rounded-sm transition-colors duration-200"
                                                title="Share via WhatsApp"
                                            >
                                                📱 Share
                                            </button>
                                            <Link
                                                href={`/invitation/${invitation.id}`}
                                                target="_blank"
                                                className="bg-dusty-blue-500 hover:bg-dusty-blue-600 text-white text-xs font-medium py-0.5 px-2 rounded-sm transition-colors duration-200 text-center"
                                            >
                                                Preview
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(invitation.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-0.5 px-2 rounded-sm transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}