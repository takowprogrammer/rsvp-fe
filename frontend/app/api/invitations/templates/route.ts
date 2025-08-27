import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/environment';

export async function GET() {
    try {
        const response = await fetch(getBackendEndpoint('/invitations/templates'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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
        console.error('Error fetching templates from backend:', error);

        // Fallback to hardcoded templates if backend is unavailable
        // Note: The backend returns template names like "dusty_blue_nude_blend" but the actual
        // image files are named like "wedding_invitation_dusty_blue_nude_blend.png"
        // So we need to map the backend names to the correct image file paths
        // This includes ALL available images, not just what the backend returns
        const fallbackTemplates = [
            {
                templateName: "dusty_blue_nude_blend",
                imageUrl: "/invitations/wedding_invitation_dusty_blue_nude_blend.png",
                file: "wedding_invitation_dusty_blue_nude_blend.png",
                displayName: "Dusty Blue Nude Blend"
            },
            {
                templateName: "dusty_blue_serenity",
                imageUrl: "/invitations/wedding_invitation_dusty_blue_serenity.png",
                file: "wedding_invitation_dusty_blue_serenity.png",
                displayName: "Dusty Blue Serenity"
            },
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
                templateName: "pure_white_elegance",
                imageUrl: "/invitations/wedding_invitation_improved_1.png",
                file: "wedding_invitation_improved_1.png",
                displayName: "Pure White Elegance"
            },
            {
                templateName: "vintage_romantic_invitation",
                imageUrl: "/invitations/wedding_invitation_improved_3.png",
                file: "wedding_invitation_improved_3.png",
                displayName: "Vintage Romantic Invitation"
            },
            // Additional templates for the extra images
            {
                templateName: "wedding_invitation_improved_4",
                imageUrl: "/invitations/wedding_invitation_improved_4.png",
                file: "wedding_invitation_improved_4.png",
                displayName: "Wedding Invitation Improved 4"
            },
            {
                templateName: "wedding_invitation_template_1",
                imageUrl: "/invitations/wedding_invitation_template_1.png",
                file: "wedding_invitation_template_1.png",
                displayName: "Wedding Invitation Template 1"
            },
            {
                templateName: "wedding_photo",
                imageUrl: "/invitations/wedding_photo.png",
                file: "wedding_photo.png",
                displayName: "Wedding Photo"
            }
        ];

        return NextResponse.json(fallbackTemplates);
    }
}
