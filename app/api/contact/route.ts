import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ContactMessageRecord } from "@/types/database";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { portfolio_id, portfolio_title, name, email, subject, message } =
      body as {
        portfolio_id?: string;
        portfolio_title?: string;
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
      };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const newMessage: ContactMessageRecord = {
      id:
        "msg_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      portfolio_id: portfolio_id || "default",
      portfolio_title: portfolio_title || "Portfolio",
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : "Portfolio Contact Submission",
      message: message.trim(),
      read: false,
      created_at: new Date().toISOString(),
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        await supabase.from("contact_messages").insert({
          id: newMessage.id,
          portfolio_id: newMessage.portfolio_id,
          portfolio_title: newMessage.portfolio_title,
          name: newMessage.name,
          email: newMessage.email,
          subject: newMessage.subject,
          message: newMessage.message,
          read: false,
          created_at: newMessage.created_at,
        });
      } catch (dbErr) {
        console.warn(
          "Supabase message insert fallback to local response:",
          dbErr,
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: newMessage,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to submit contact message";
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
