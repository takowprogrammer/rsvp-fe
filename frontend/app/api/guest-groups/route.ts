import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

export async function GET() {
    try {
        const response = await fetch(`${backendUrl}/guest-groups`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: 'Failed to fetch guest groups' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching guest groups:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch(`${backendUrl}/guest-groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { message: errorData.message || 'Failed to create guest group' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error creating guest group:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
