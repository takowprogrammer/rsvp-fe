import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch(`${backendUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const result = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: result.message || 'Login failed' }, { status: res.status });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Login API error:', error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}


