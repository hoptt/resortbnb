import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId") as string;
  const limit = searchParams.get("limit") as string;
  const page = searchParams.get("page") as string;
  const my = searchParams.get("my") as string;

  const session = await getServerSession(authOptions);

  const count = await prisma.comment.count({
    where: {
      roomId: roomId ? parseInt(roomId) : {},
      userId: my ? session?.user.id : {},
    },
  });

  if (page) {
    const skipPage = parseInt(page) - 1;
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        roomId: roomId ? parseInt(roomId) : {},
        userId: my ? session?.user.id : {},
      },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
      include: {
        user: true,
      },
    });
    return NextResponse.json({
      page: parseInt(page),
      data: comments,
      totalCount: count,
      totalPage: Math.ceil(count / parseInt(limit)),
    });
  } else {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      where: {
        roomId: roomId ? parseInt(roomId) : {},
        userId: my ? session?.user.id : {},
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(
      { data: comments, totalCount: count },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const formData = await req.json();

  const { roomId, body } = formData;

  if (!session?.user) {
    return NextResponse.json(
      {
        error: "unauthorized user",
      },
      { status: 401 }
    );
  }

  const comment = await prisma.comment.create({
    data: {
      roomId,
      body,
      userId: session?.user.id,
    },
  });

  return NextResponse.json(comment, { status: 200 });
}
