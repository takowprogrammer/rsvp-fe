import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { filename: string } }
) {
    try {
        const { filename } = params;

        if (!filename) {
            return NextResponse.json({ error: 'Filename is required.' }, { status: 400 });
        }

        // Forward the request to the backend
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';
        const backendResponse = await fetch(`${backendUrl}/invitations/template/${encodeURIComponent(filename)}`, {
            method: 'DELETE',
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json();
            return NextResponse.json({ error: errorData.message || 'Failed to delete template' }, { status: backendResponse.status });
        }

        const result = await backendResponse.json();
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error in delete template API route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
