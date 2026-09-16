// lib/doubtService.js — all Supabase calls for the Doubts board
import { supabase } from "./supabase";

export async function fetchDoubts({ grade, subject, status, studentId }) {
  let q = supabase.from("Doubts").select("*").order("Created_At", { ascending: false });
  if (grade)   q = q.eq("Grade", parseInt(grade));
  if (subject) q = q.eq("Subject", subject);
  if (status)  q = q.eq("Status", status);
  const { data, error } = await q;
  if (error) throw error;
  const rows = data || [];
  // Students see public doubts of their class plus their own private ones
  return studentId ? rows.filter(d => !d.Is_Private || d.Student_Id === studentId) : rows;
}

export async function postDoubt(doubt) {
  const { data, error } = await supabase.from("Doubts").insert([doubt]).select().single();
  if (error) throw error;
  return data;
}

export async function fetchReplies(doubtId) {
  const { data, error } = await supabase.from("Doubt_Replies").select("*")
    .eq("Doubt_Id", doubtId).order("Created_At", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function postReply(reply) {
  const { data, error } = await supabase.from("Doubt_Replies").insert([reply]).select().single();
  if (error) throw error;
  return data;
}

export async function setDoubtStatus(id, status) {
  const { error } = await supabase.from("Doubts").update({ Status: status }).eq("Id", id);
  if (error) throw error;
}

export async function uploadImage(file) {
  const safe = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
  const path = `${Date.now()}-${safe}`;
  const { error } = await supabase.storage.from("doubts").upload(path, file);
  if (error) throw error;
  return supabase.storage.from("doubts").getPublicUrl(path).data.publicUrl;
}

export function timeAgo(iso) {
  const m = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
