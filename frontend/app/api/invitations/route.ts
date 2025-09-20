import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/backend';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    try {
        const res = await fetch(getBackendEndpoint('/invitations'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });

        if (!res.ok) {
            const result = await res.json().catch(() => ({ message: 'Failed to fetch invitations' }));
            console.error('Invitations API error:', result);
            return NextResponse.json({ error: result.message || 'Failed to fetch invitations' }, { status: res.status });
        }

        const result = await res.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching invitations:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');

    try {
        const body = await req.json();
        
        const res = await fetch(getBackendEndpoint('/invitations'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const result = await res.json().catch(() => ({ message: 'Failed to create invitation' }));
            console.error('Create invitation API error:', result);
            return NextResponse.json({ error: result.message || 'Failed to create invitation' }, { status: res.status });
        }

        const result = await res.json();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error creating invitation:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    console.log("DELETE request received at /api/invitations");
    const authHeader = req.headers.get('authorization');
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Invitation ID is required' }, { status: 400 });
    }

    try {
        const res = await fetch(getBackendEndpoint(`/invitations/${id}`), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
        });

        if (!res.ok) {
            const result = await res.json().catch(() => ({ message: 'Failed to delete invitation' }));
            console.error('Delete invitation API error:', result);
            return NextResponse.json({ error: result.message || 'Failed to delete invitation' }, { status: res.status });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting invitation:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}