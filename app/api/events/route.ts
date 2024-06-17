import prisma from "@/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as string;

  const events = await prisma.events.findFirst({
    where: {
      type,
    },
    select: {
      term: true,
    },
  });

  return NextResponse.json(events, { status: 200 });
}
