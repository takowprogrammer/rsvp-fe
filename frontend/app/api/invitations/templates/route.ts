import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/environment';

export async function GET() {
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`🔍 Attempt ${attempt} to fetch templates from backend...`);
            const backendUrl = getBackendEndpoint('/invitations/templates');
            console.log(`🔍 Backend URL: ${backendUrl}`);

            const response = await fetch(backendUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add timeout
                signal: AbortSignal.timeout(10000), // 10 second timeout
            });

            if (!response.ok) {
                throw new Error(`Backend responded with status: ${response.status}`);
            }

            const templates = await response.json();
            console.log('🔍 Backend templates response:', templates);

            // Add display names for better user experience
            const templatesWithDisplayNames = templates.map((t: any) => ({
                ...t,
                displayName: t.templateName
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (l: string) => l.toUpperCase())
            }));

            console.log('🔍 Templates with display names:', templatesWithDisplayNames);
            return NextResponse.json(templatesWithDisplayNames);
        } catch (error) {
            console.error(`Error fetching templates from backend (attempt ${attempt}):`, error);

            if (attempt === maxRetries) {
                console.error('All retry attempts failed, using fallback templates');
                break;
            }

            // Wait before retrying
            console.log(`Waiting ${retryDelay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }

    // Fallback to hardcoded templates if backend is unavailable
    // Using only the image files that actually exist in the public/invitations directory
    const fallbackTemplates = [
        {
            templateName: "elegant_floral_invitation",
            imageUrl: "/invitations/invitation-template-1.png",
            file: "invitation-template-1.png",
            displayName: "Elegant Floral Invitation"
        },
        {
            templateName: "modern_minimalist_invitation",
            imageUrl: "/invitations/invitation-template-2.png",
            file: "invitation-template-2.png",
            displayName: "Modern Minimalist Invitation"
        },
        {
            templateName: "nude_warmth",
            imageUrl: "/invitations/invitation-template-3.png",
            file: "invitation-template-3.png",
            displayName: "Nude Warmth"
        },
        {
            templateName: "phoenix_sand_radiance",
            imageUrl: "/invitations/invitation-template-4.png",
            file: "invitation-template-4.png",
            displayName: "Phoenix Sand Radiance"
        },
        {
            templateName: "photo_1",
            imageUrl: "/invitations/IMG-20250905-WA0003.jpg",
            file: "IMG-20250905-WA0003.jpg",
            displayName: "Wedding Photo 1"
        },
        {
            templateName: "photo_2",
            imageUrl: "/invitations/IMG-20250905-WA0021.jpg",
            file: "IMG-20250905-WA0021.jpg",
            displayName: "Wedding Photo 2"
        },
        {
            templateName: "photo_3",
            imageUrl: "/invitations/IMG-20250905-WA0025.jpg",
            file: "IMG-20250905-WA0025.jpg",
            displayName: "Wedding Photo 3"
        },
        {
            templateName: "photo_4",
            imageUrl: "/invitations/IMG-20250905-WA0026.jpg",
            file: "IMG-20250905-WA0026.jpg",
            displayName: "Wedding Photo 4"
        }
    ];

    return NextResponse.json(fallbackTemplates);
}