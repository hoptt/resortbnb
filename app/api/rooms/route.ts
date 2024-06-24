import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import axios from "axios";
import { authOptions } from "@/utils/authOptions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") as string;
  const limit = (searchParams.get("limit") as string) || "10";
  const id = searchParams.get("id") as string;

  // 나의 숙소만 불러오기
  const my = searchParams.get("my") as string;

  // 메인페이지 필터링
  const location = searchParams.get("location") as string;
  const category = searchParams.get("category") as string;
  // 내가 만든 숙소 필터링
  const q = searchParams.get("q") as string;

  // 필터된 숙소 불러오기
  const filter = searchParams.get("filter") as string;

  // 세일 숙소 불러오기
  const sale = searchParams.get("sale") as string;

  const session = await getServerSession(authOptions);

  if (id) {
    const room = await prisma.room.findFirst({
      where: {
        id: parseInt(id),
        use: "Y",
      },
      include: {
        likes: {
          where: session ? { userId: session.user?.id } : {},
        },
        comments: true,
      },
    });
    return NextResponse.json(room, { status: 200 });
  } else if (my) {
    if (!session?.user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const count = await prisma.room.count({
      where: {
        use: "Y",
        userId: session?.user?.id,
        title: q ? { contains: q } : {},
      },
    });

    const skipPage = parseInt(page) - 1;

    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        use: "Y",
        userId: session?.user?.id,
        title: q ? { contains: q } : {},
      },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
    });

    return NextResponse.json(
      {
        page: parseInt(page),
        data: rooms,
        totalCount: count,
        totalPage: Math.ceil(count / parseInt(limit)),
      },
      { status: 200 }
    );
  } else if (page) {
    let count = 0;
    const skipPage = parseInt(page) - 1;
    let options: any = {
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
      include: {
        likes: {
          where: session ? { userId: session.user?.id } : {},
        },
      },
      where: {
        use: "Y",
      },
    };
    if (filter) {
      options = {
        ...options,
        where: {
          ...options.where,
          base_address: location ? { contains: location } : {},
          category: category ? category : {},
        },
      };
      if (sale) {
        options = {
          ...options,
          where: {
            ...options.where,
            sale: {
              not: null,
            },
          },
        };
        count = await prisma.room.count({
          where: {
            ...options.where,
            sale: {
              not: null,
            },
          },
        });
      } else {
        count = await prisma.room.count({
          where: {
            ...options.where,
          },
        });
      }
    } else {
      count = await prisma.room.count({
        where: {
          ...options.where,
        },
      });
    }

    const rooms = await prisma.room.findMany(options);

    return NextResponse.json(
      {
        page: parseInt(page),
        data: rooms,
        totalCount: count,
        totalPage: Math.ceil(count / parseInt(limit)),
      },
      { status: 200 }
    );
  } else {
    const data = await prisma.room.findMany({
      where: {
        use: "Y",
      },
    });

    return NextResponse.json(data, {
      status: 200,
    });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const formData = await req.json();
  const kakaoHeaders = {
    Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
  };
  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      formData.base_address
    )}`,
    {
      headers: kakaoHeaders,
    }
  );

  const result = await prisma.room.create({
    data: {
      ...formData,
      userId: session.user.id,
      price: parseInt(formData.price),
      lat: data.documents[0].address.y,
      lng: data.documents[0].address.x,
    },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;
  const use = searchParams.get("use") as string;
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (use) {
    const result = await prisma.room.update({
      where: {
        id: parseInt(id),
      },
      data: {
        use,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } else {
    const formData = await req.json();
    const kakaoHeaders = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        formData.base_address
      )}`,
      {
        headers: kakaoHeaders,
      }
    );

    const result = await prisma.room.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...formData,
        userId: session.user.id,
        price: parseInt(formData.price),
        lat: data.documents[0].address.y,
        lng: data.documents[0].address.x,
      },
    });

    return NextResponse.json(result, { status: 200 });
  }
}

// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id") as string;
//   const session = await getServerSession(authOptions);
//   if (!session?.user)
//     return NextResponse.json({ error: "unauthorized" }, { status: 401 });

//   if (id) {
//     const result = await prisma.room.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     return NextResponse.json(result, { status: 200 });
//   }
//   return NextResponse.json(null, { status: 500 });
// }
