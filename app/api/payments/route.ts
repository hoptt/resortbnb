import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
interface PaymentProps {
  bookingId: string;
  amount: string;
  orderId: string;
  orderName: string;
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED";
}

interface PaymentApproveProps {
  orderId: string;
  paymentKey: string;
  amount: string;
  method: string;
  receiptUrl: string;
  approvedAt: string;
  status:
    | "READY"
    | "IN_PROGRESS"
    | "WAITING_FOR_DEPOSIT"
    | "DONE"
    | "CANCELED"
    | "PARTIAL_CANCELED"
    | "ABORTED"
    | "EXPIRED";
  bookingStatus: "CANCEL" | "SUCCESS" | "PENDING" | "FAILED";
  failureCode: string;
  failureMessage: string;
  cardNumber: string;
  type: "NORMAL" | "BILLING" | "BRANDPAY";
  mId: string;
  requestedAt: string;
  cardType: string;
  checkoutUrl: string;
}

export async function POST(req: Request) {
  // 요청 데이터 생성
  const session = await getServerSession(authOptions);
  const formData = await req.json();

  const { bookingId, amount, status, orderId, orderName }: PaymentProps =
    formData;

  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount: parseInt(amount),
      status,
      orderId,
      orderName,
    },
  });

  return NextResponse.json(payment, { status: 200 });
}

export async function PATCH(req: Request) {
  // 승인 데이터 업데이트
  const formData = await req.json();
  const { orderId, amount, bookingStatus, ...rest }: PaymentApproveProps =
    formData;
  const payment = await prisma.payment.update({
    where: {
      orderId,
    },
    data: {
      ...rest,
      orderId,
      amount: parseInt(amount),
    },
  });

  await prisma.booking.update({
    where: {
      id: payment.bookingId,
    },
    data: {
      status: bookingStatus,
    },
  });

  return NextResponse.json(payment, { status: 200 });
}
