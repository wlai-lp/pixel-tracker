import { NextRequest, NextResponse } from 'next/server';
import { ipAddress } from "@vercel/functions";
import { db, TrackingData } from '@/lib/db';

// import { createClient } from 'redis';




export async function GET(request: NextRequest) {
 

  const query = request.nextUrl.searchParams.toString();
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const ip = ipAddress(request) || 'Unknown';

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

