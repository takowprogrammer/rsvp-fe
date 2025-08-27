import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    try {
        const res = await fetch(`${backendUrl}/guests/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });

        if (!res.ok) {
            const result = await res.json().catch(() => ({ message: 'Failed to fetch stats' }));
            console.error('Guests stats API error:', result);
            return NextResponse.json({ error: result.message || 'Failed to fetch stats' }, { status: res.status });
        }

        const result = await res.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching guest stats:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
