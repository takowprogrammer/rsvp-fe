import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/backend';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const authHeader = req.headers.get('authorization');

    try {
        // The backend endpoint that generates the full HTML page for the envelope
        const url = getBackendEndpoint(`/invitations/${encodeURIComponent(id)}/preview`);

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                // Forward auth header if it exists
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });

        if (!res.ok) {
            // Forward the error response from the backend
            return NextResponse.json(
                { error: `Failed to fetch invitation preview: ${res.statusText}` },
                { status: res.status }
            );
        }

        // Get the HTML content as text from the backend response
        const htmlContent = await res.text();

        // Return the HTML content with the correct content type
        return new NextResponse(htmlContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
