import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

export async function GET(req: NextRequest) {
    const fullUrl = new URL(`${backendUrl}/guests/admin`);

    // Forward query params from the incoming request
    req.nextUrl.searchParams.forEach((value, key) => {
        fullUrl.searchParams.append(key, value);
    });

    const authHeader = req.headers.get('authorization');

    try {
        const res = await fetch(fullUrl.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });
        const result = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: result.message || 'Failed to fetch guests' }, { status: res.status });
        }
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching guests:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
