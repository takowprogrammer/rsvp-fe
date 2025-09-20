import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/backend';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const { filename } = await params;
    console.log(`[Image Proxy] Received request for filename: ${filename}`);

    try {
        // Security check - only allow certain file extensions
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf('.'));

        if (!allowedExtensions.includes(fileExtension)) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        const authHeader = req.headers.get('authorization');
        const imageUrl = getBackendEndpoint(`/invitations/image/${filename}`);
        console.log(`[Image Proxy] Fetching from backend URL: ${imageUrl}`);

        // Fetch the image from the backend
        const response = await fetch(imageUrl, {
            headers: {
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });

        console.log(`[Image Proxy] Backend response status: ${response.status}`);

        if (!response.ok) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        const imageBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
            },
        });
    } catch (error) {
        console.error('Error serving image:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}