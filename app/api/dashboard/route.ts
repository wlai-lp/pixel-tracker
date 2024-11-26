import { NextRequest, NextResponse } from 'next/server';
import { db, TrackingData } from '@/lib/db';

export async function GET(request: NextRequest) {
    let result = await db.getAllEntries()
    console.log(JSON.stringify(result))
    return NextResponse.json(result)
}