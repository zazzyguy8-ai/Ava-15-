import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { saveSession } from "@/lib/sessions";

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();
    if (!answers || typeof answers !== "object") {
      return Response.json({ error: "Invalid answers" }, { status: 400 });
    }
    const sessionId = randomUUID();
    saveSession(sessionId, answers);
    return Response.json({ sessionId });
  } catch (err) {
    console.error("save-answers error:", err);
    return Response.json({ error: "Server error: " + String(err) }, { status: 500 });
  }
}
