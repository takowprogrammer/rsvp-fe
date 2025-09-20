import { NextRequest, NextResponse } from 'next/server';
import { getBackendEndpoint } from '@/config/backend';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authHeader = req.headers.get('authorization');

  try {
    const url = getBackendEndpoint(`/invitations/${encodeURIComponent(id)}`);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to fetch invitation' }, { status: res.status });
    }

    const invitation = await res.json();
    return NextResponse.json(invitation);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}