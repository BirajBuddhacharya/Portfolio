import { NextResponse as res } from 'next/server';

export function GET() { 
    return res.json({
        message: 'Hello, this is a test response from the API!'
    });
}