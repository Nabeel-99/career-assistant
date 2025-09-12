import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("🎉 VAPI Webhook received!");
    console.log("📊 Full webhook data:", JSON.stringify(body, null, 2));

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

      console.log("💰 Call Details:", {
        duration: callDetails.duration + " seconds",
        cost: "$" + callDetails.cost,
        transcript: callDetails.transcript?.substring(0, 100) + "...",
        endedReason: callDetails.endedReason,
        userId: callDetails.userId,
      });

      // Store call details in our API
      try {
        const callDataToStore = {
          vapiCallId: callData.id,
          practiceId: callData.assistant?.metadata?.userId, // Using userId as practiceId for now
          duration: callData.duration,
          cost: callData.cost,
          startedAt: callData.startedAt,
          endedAt: callData.endedAt,
          endedReason: callData.endedReason,
          transcript: transcript,
          summary: summary,
          recordingUrl: recordingUrl,
          timestamp: new Date().toISOString(),
        };

        // Store in our call details API
        await fetch(
          `${
            process.env.NEXT_PUBLIC_APP_URL ||
            "https://career-assistant-beta.vercel.app"
          }/api/call-details`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(callDataToStore),
          }
        );

        console.log("✅ Call details stored successfully");
      } catch (storeError) {
        console.error("❌ Error storing call details:", storeError);
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
