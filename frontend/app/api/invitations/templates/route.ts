import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/backend';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    try {
        const backendUrl = getBackendEndpoint('/invitations/templates');
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
            signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        if (!response.ok) {
            console.error(`Backend responded with status: ${response.status}`);
            const errorBody = await response.text();
            console.error(`Error body: ${errorBody}`);
            return NextResponse.json(
                { message: `Failed to fetch templates. Status: ${response.status}` },
                { status: response.status }
            );
        }

        const templates = await response.json();
        return NextResponse.json(templates);

    } catch (error) {
        console.error('Error fetching templates:', error);
        return NextResponse.json(
            { message: 'Internal server error while fetching templates' },
            { status: 500 }
        );
    }
}