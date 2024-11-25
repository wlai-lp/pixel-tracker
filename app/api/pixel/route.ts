import { NextRequest, NextResponse } from 'next/server';
import { db, TrackingData } from '@/lib/db';

import { createClient } from 'redis';




export async function GET(request: NextRequest) {


  const client = createClient({
    url: process.env.REDIS_URL
  });
  client.on('error', err => console.log('Redis Client Error', err));
  await client.connect();
  console.log('Client Connected')


  const query = request.nextUrl.searchParams.toString();
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const ip = request.ip || 'Unknown';

  const trackingData: TrackingData = {
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
    query,
  };

  db.addEntry(trackingData);

  // Create a 1x1 transparent GIF
  const TRANSPARENT_GIF_BUFFER = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );

  return new NextResponse(TRANSPARENT_GIF_BUFFER, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

