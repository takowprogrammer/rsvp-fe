import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/backend';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    try {
        const res = await fetch(getBackendEndpoint('/guests/all'), {
            headers: {
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to fetch guests' }));
            console.error('Fetch all guests API error:', errorData);
            return NextResponse.json({ error: errorData.message || 'Failed to fetch guests' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching all guests:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
