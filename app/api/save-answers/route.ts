import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { randomUUID } from "crypto";

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || typeof answers !== "object") {
      return Response.json({ error: "Invalid answers" }, { status: 400 });
    }

    const sessionId = randomUUID();
    await redis.set(`session:${sessionId}`, JSON.stringify(answers), { ex: 86400 });

    return Response.json({ sessionId });
  } catch (err) {
    console.error("save-answers error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
