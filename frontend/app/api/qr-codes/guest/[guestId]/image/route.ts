import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/backend';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ guestId: string }> }
) {
    const { guestId } = await params;

    try {
        const authHeader = req.headers.get('authorization');
        const backendUrl = getBackendEndpoint(`/qr-codes/guest/${encodeURIComponent(guestId)}/image`);

        const resp = await fetch(backendUrl, {
            headers: {
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });

        if (!resp.ok) {
            return NextResponse.json({ error: 'QR image not found' }, { status: resp.status });
        }

        const contentType = resp.headers.get('content-type') || 'image/png';
        const arrayBuffer = await resp.arrayBuffer();

        return new NextResponse(arrayBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to proxy QR image' }, { status: 500 });
    }
}
