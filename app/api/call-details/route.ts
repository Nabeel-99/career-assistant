import { NextRequest, NextResponse } from "next/server";

// This is a simple in-memory store for demo purposes
// In production, you'd store this in a database
let callDetailsStore: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const practiceId = searchParams.get("practiceId");

    if (practiceId) {
      const practiceCalls = callDetailsStore.filter(
        (call) => call.practiceId === practiceId
      );
      return NextResponse.json({ success: true, calls: practiceCalls });
    }

    return NextResponse.json({ success: true, calls: callDetailsStore });
  } catch (error) {
    console.error("Error fetching call details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch call details" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    callDetailsStore.push(body);
    console.log("📝 Call details stored:", body);
    return NextResponse.json({ success: true, message: "Call details stored" });
  } catch (error) {
    console.error("Error storing call details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to store call details" },
      { status: 500 }
    );
  }
}
