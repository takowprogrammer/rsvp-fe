import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/backend';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch(getBackendEndpoint('/auth/login'), {
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
    } catch (error) {
        console.error('Login API error:', error);
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


