import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '../../../../../config/backend';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const eventDate = searchParams.get('eventDate');

    try {
        const url = `${getBackendEndpoint('/guests/stats/extended')}${eventDate ? `?eventDate=${encodeURIComponent(eventDate)}` : ''}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(req.headers.get('authorization') ? { Authorization: req.headers.get('authorization')! } : {}),
            },
        });

        if (!response.ok) {
            const result = await response.json().catch(() => ({ message: 'Failed to fetch extended stats' }));
            console.error('Stats API error:', result);
            return NextResponse.json({ error: result.message || 'Failed to fetch extended stats' }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching extended guest stats:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
