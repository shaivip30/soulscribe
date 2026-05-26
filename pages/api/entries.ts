import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ── GET /api/entries ── fetch all entries, newest first
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    // Normalise to the shape the frontend expects
    const entries = (data ?? []).map((row) => ({
      id:      row.id,
      text:    row.text,
      emotion: row.emotion,
      date:    new Date(row.created_at).toLocaleString(),
    }));

    return res.status(200).json({ entries });
  }

  // ── POST /api/entries ── save a new entry
  if (req.method === "POST") {
    const { text, emotion } = req.body as { text: string; emotion: string };

    if (!text || !emotion) {
      return res.status(400).json({ error: "text and emotion are required" });
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .insert([{ text, emotion }])
      .select()
      .single();

    if (error) {
      console.error("Supabase POST error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    const entry = {
      id:      data.id,
      text:    data.text,
      emotion: data.emotion,
      date:    new Date(data.created_at).toLocaleString(),
    };

    return res.status(201).json({ entry });
  }

  // ── DELETE /api/entries?id=123 ── delete one entry
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "id query param is required" });
    }

    const { error } = await supabase
      .from("journal_entries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase DELETE error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}