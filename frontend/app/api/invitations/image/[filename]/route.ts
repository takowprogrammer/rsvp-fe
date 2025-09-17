import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/environment';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;

        if (!filename) {
            return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
        }

        // Construct the backend URL for the image
        const backendUrl = getBackendEndpoint(`/invitations/image/${filename}`);

        // Fetch the image from the backend
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Accept': 'image/*',
            },
            signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend responded with status: ${response.status}` },
                { status: response.status }
            );
        }

        // Get the image data
        const imageBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        // Return the image with proper headers
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error fetching image from backend:', error);
        return NextResponse.json(
            { error: 'Failed to fetch image' },
            { status: 500 }
        );
    }
}
