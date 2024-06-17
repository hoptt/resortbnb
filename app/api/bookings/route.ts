import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import prisma from "@/db";
import { NextResponse } from "next/server";

interface BookingProps {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestCount: string;
  totalAmount: string;
  totalDays: string;
  discounted?: string;
  status: "SUCCESS" | "CANCEL" | "PENDING" | "FAILED";
}

interface RefundProps {
  id: string;
  status: "SUCCESS" | "CANCEL" | "PENDING" | "FAILED";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;
  const page = searchParams.get("page") as string;
  const limit = searchParams.get("limit") as string;
  const session = await getServerSession(authOption);

  if (id) {
    const booking = await prisma.booking.findFirst({
      where: {
        id: id,
      },
      include: {
        user: true,
        room: true,
        payments: true,
      },
    });
    return NextResponse.json(booking, { status: 200 });
  } else if (page) {
    const count = await prisma.booking.count({
      where: {
        userId: session?.user.id,
        NOT: {
          status: "PENDING",
        },
      },
    });

    const skipPage = parseInt(page) - 1;
    const bookings = await prisma.booking.findMany({
      orderBy: { updatedAt: "desc" },
      where: {
        userId: session?.user.id,
      },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
      include: {
        user: true,
        room: true,
      },
    });

    return NextResponse.json(
      { page: parseInt(page), data: bookings, totalPage: count },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOption);
  const formData = await req.json();

  const {
    roomId,
    checkIn,
    checkOut,
    guestCount,
    totalAmount,
    totalDays,
    discounted,
    status,
  }: BookingProps = formData;

  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized user" }, { status: 401 });
  }

  const booking = await prisma.booking.create({
    data: {
      roomId: parseInt(roomId),
      userId: session.user.id,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guestCount: parseInt(guestCount),
      totalAmount: parseInt(totalAmount),
      totalDays: parseInt(totalDays),
      discounted: parseInt(discounted!) || null,
      status,
    },
  });

  return NextResponse.json(booking, { status: 200 });
}

export async function PATCH(req: Request) {
  const formData = await req.json();
  const { id, status }: RefundProps = formData;
  const session = await getServerSession(authOption);

  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized user" }, { status: 401 });
  }

  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json(result, { status: 200 });
}
