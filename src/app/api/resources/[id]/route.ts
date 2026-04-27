import { NextRequest, NextResponse } from 'next/server';
import { getResourcesForItem, addResource, deleteResource } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = decodeURIComponent(params.id);
    const resources = await getResourcesForItem(itemId);
    return NextResponse.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = decodeURIComponent(params.id);
    const body = await request.json();
    const { type, title, url, fileData } = body;

    if (!type || !title || (type === 'link' && !url) || (type === 'file' && !fileData)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const resource = await addResource(itemId, type, title, url, fileData);
    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error adding resource:', error);
    return NextResponse.json({ error: 'Failed to add resource' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resourceId = decodeURIComponent(params.id);
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'delete-resource') {
      await deleteResource(resourceId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
  }
}
