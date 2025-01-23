import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "broken" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/api/populate');
    if (!response.ok) {
      throw new Error('Failed to fetch data here');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch data' }, 
      { status: 500 }
    );
  }
}
