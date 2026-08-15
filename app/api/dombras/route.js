// app/api/dombras/route.js
//
// Нужен для кнопки «Показать ещё»: клиентская сетка не может сама
// сходить в базу (ключи и логика запросов живут на сервере, в
// lib/dombras.js), поэтому просит следующую порцию через этот адрес.
import { NextResponse } from "next/server";
import { getDombras } from "@/lib/dombras";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "9", 10);

  const { items, total } = await getDombras(limit, offset);
  return NextResponse.json({ items, total });
}
