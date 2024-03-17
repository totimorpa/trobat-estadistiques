// pages/api/addEntry.js
import { NextResponse } from "next/server";

import prisma from "../../../lib/prisma";

export async function POST(req) {
  const { type, nom } = await req.json();
  try {
    await prisma[type].create({
      data: {
        name: nom,
        location: type === "toilet" ? "Bathroom" : "Bedroom",
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
