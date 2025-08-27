import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/environment';

export async function GET() {
    try {
        const response = await fetch(getBackendEndpoint('/invitations'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Backend responded with status: ${response.status}`);
        }

        const invitations = await response.json();
        return NextResponse.json(invitations);
    } catch (error) {
        console.error('Error fetching invitations from backend:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invitations' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Received invitation creation request:', body);

        const { templateName, title, message, buttonText, imageUrl, formUrl } = body;

        // Validate required fields
        if (!templateName || !title || !message || !buttonText) {
            console.error('Missing required fields:', { templateName, title, message, buttonText });
            return NextResponse.json(
                { error: 'Missing required fields: templateName, title, message, and buttonText are required' },
                { status: 400 }
            );
        }

        const invitationData = {
            templateName,
            title,
            message,
            buttonText,
            imageUrl: imageUrl || null,
            formUrl: formUrl || '/rsvp',
        };

        console.log('Sending invitation data to backend:', invitationData);
        console.log('Backend endpoint:', getBackendEndpoint('/invitations'));

        // Send request to backend
        const response = await fetch(getBackendEndpoint('/invitations'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invitationData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            console.error('Backend error response:', errorData);
            throw new Error(errorData.error || errorData.message || `Backend responded with status: ${response.status}`);
        }

        const invitation = await response.json();
        console.log('Created invitation via backend:', invitation);

        return NextResponse.json(invitation, { status: 201 });
    } catch (error: any) {
        console.error('Error creating invitation:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create invitation' },
            { status: 500 }
        );
    }
}
