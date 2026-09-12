import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { portfolio_id, device, referrer } = body as {
      portfolio_id?: string;
      device?: string;
      referrer?: string;
    };

    if (!portfolio_id) {
      return NextResponse.json(
        { error: "Portfolio ID required." },
        { status: 400 },
      );
    }

    const viewRecord = {
      id: "vw_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      portfolio_id,
      device: device || "desktop",
      referrer: referrer || "direct",
      viewed_at: new Date().toISOString(),
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        await supabase.from("portfolio_views").insert(viewRecord);
      } catch (dbErr) {
        console.warn("Supabase view track fallback to local response:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      view: viewRecord,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to record analytics event";
    console.error("Analytics Track API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
