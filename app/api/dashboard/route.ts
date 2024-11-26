import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
    const result = await db.getAllEntries()
    console.log(JSON.stringify(request))
    return NextResponse.json(result)
}