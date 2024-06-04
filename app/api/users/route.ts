import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOption);

  if (!session?.user) {
    return NextResponse.json(
      { error: "유저 정보가 없습니다" },
      { status: 401 }
    );
  }

  const data = await prisma.user.findFirst({
    where: {
      id: session?.user.id,
    },
    include: {
      account: true,
    },
  });

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(req: Request) {
  const formData = await req.json();
  const session = await getServerSession(authOption);

  if (!session?.user) {
    return NextResponse.json(
      { error: "유저 정보가 없습니다" },
      { status: 401 }
    );
  }

  const result = await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      ...formData,
    },
  });

  return NextResponse.json(result, { status: 200 });
}
