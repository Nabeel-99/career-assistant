import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("VAPI Webhook received:", JSON.stringify(body, null, 2));

    // Handle end-of-call-report event
    if (body.message?.type === "end-of-call-report") {
      const callData = body.message.call;
      const transcript = body.message.transcript;
      const summary = body.message.summary;
      const recordingUrl = body.message.recordingUrl;

      // Extract call details
      const callDetails = {
        vapiCallId: callData.id,
        duration: callData.duration, // Duration in seconds
        cost: callData.cost, // Cost in dollars
        startedAt: callData.startedAt,
        endedAt: callData.endedAt,
        endedReason: callData.endedReason,
        transcript: transcript,
        summary: summary,
        recordingUrl: recordingUrl,
        userId: callData.assistant?.metadata?.userId, // This comes from your metadata
      };

      console.log("Call Details:", callDetails);

      // Store call details in database
      // We'll create a simple calls table or add to existing schema
      try {
        // For now, just log it - you can store in database later
        console.log("Would store call details:", {
          vapiCallId: callDetails.vapiCallId,
          duration: callDetails.duration,
          cost: callDetails.cost,
          userId: callDetails.userId,
          transcript: callDetails.transcript?.substring(0, 100) + "...",
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
      }

      return NextResponse.json({
        success: true,
        message: "Call details received",
      });
    }

    // Handle other VAPI events
    if (body.message?.type === "status-update") {
      console.log("Status update:", body.message);
    }

    return NextResponse.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("VAPI Webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
