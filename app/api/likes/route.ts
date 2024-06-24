import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { timeout } from "@/utils";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;
  const skipPage = parseInt(page) - 1;

  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized user" }, { status: 401 });
  }
  const count = await prisma.like.count({
    where: {
      userId: session?.user?.id,
    },
  });

  const likes = await prisma.like.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      userId: session?.user?.id,
    },
    include: {
      room: true,
    },

    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
  });

  return NextResponse.json({
    page: parseInt(page),
    data: likes,
    totalCount: count,
    totalPage: Math.ceil(count / parseInt(limit)),
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized user" }, { status: 401 });
  }

  await timeout(1000);
  const formData = await req.json();
  const { roomId } = formData;

  let like = await prisma.like.findFirst({
    where: {
      roomId,
      userId: session?.user?.id,
    },
  });

  if (like) {
    like = await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return NextResponse.json(like, { status: 200 });
  } else {
    like = await prisma.like.create({
      data: {
        roomId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(like, { status: 201 });
  }
}
