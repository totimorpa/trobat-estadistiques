// api/getData.js
export const dynamic = "force-dynamic"; // defaults to auto

import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

const monthNamesCatalan = [
  "Gener",
  "Febrer",
  "Març",
  "Abril",
  "Maig",
  "Juny",
  "Juliol",
  "Agost",
  "Setembre",
  "Octubre",
  "Novembre",
  "Desembre",
];

export async function GET(req, res) {
  try {
    const data = await prisma.bed.findMany({
      select: {
        timestamp: true,
        name: true,
      },
    });

    const formattedData = {};

    data.forEach((entry) => {
      const month = monthNamesCatalan[entry.timestamp.getMonth()];
      const name = entry.name;

      if (!formattedData[month]) {
        formattedData[month] = {};
      }

      if (!formattedData[month][name]) {
        formattedData[month][name] = 1;
      } else {
        formattedData[month][name]++;
      }
    });

    // Convert to array of objects
    const result = Object.keys(formattedData).map((month) => {
      const monthData = formattedData[month];
      const monthObj = { month };
      Object.keys(monthData).forEach((name) => {
        monthObj[name] = monthData[name];
      });
      return monthObj;
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.error({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
