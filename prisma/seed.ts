import { PrismaClient } from "@prisma/client";
import { fakerKO as faker } from "@faker-js/faker";
const CATEGORY = [
  "전망좋은",
  "자연",
  "동굴",
  "캠핑장",
  "방",
  "한옥",
  "해변",
  "국립공원",
  "인기",
  "수영장",
  "농장",
  "스키",
  "호수",
  "키즈",
  "신규",
  "서핑",
  "통나무집",
  "디자인",
  "저택",
  "섬",
  "주택",
  "골프장",
  "그랜드 피아노",
  "상징적 도시",
  "트리하우스",
  "와인 농장",
  "열대 지역",
  "창작 공간",
  "컨테이너 하우스",
  "Luxe",
  "료칸",
  "돔하우스",
];
const prisma = new PrismaClient();

async function seedUsers() {
  Array.from({ length: 10 }).forEach(async () => {
    const userData = {
      email: faker.internet.email(),
      name: faker.person.lastName() + faker.person.firstName(),
      image: faker.image.avatar(),
      desc: faker.lorem.paragraph(),
    };
    const res = await prisma.user.create({
      data: userData,
    });
  });
}

async function seedRooms() {
  const totalUsers = await prisma.user.findMany();
  if (totalUsers.length > 1) {
    Array.from({ length: 100 }).forEach(async () => {
      const randomUserIndex = Math.floor(Math.random() * totalUsers.length);
      const randomUser = totalUsers[randomUserIndex];

      const roomData = {
        title: faker.lorem.words(),
        images: [
          faker.image.urlLoremFlickr({
            category: "hotel",
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: "travel",
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: "nature",
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: "building",
            width: 500,
            height: 500,
          }),
        ],
        lat: getRandomLatitude(),
        lng: getRandomLongtitude(),
        base_address:
          faker.location.state() +
          faker.location.street() +
          faker.location.streetAddress({ useFullAddress: true }),
        detailed_address: "",
        desc: faker.lorem.paragraph(),
        category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
        bedroomDesc: faker.lorem.words(),
        price: parseInt(
          faker.commerce.price({ min: 50000, max: 500000, dec: 0 })
        ),
        freeCancel: faker.datatype.boolean(),
        selfCheckIn: faker.datatype.boolean(),
        officeSpace: faker.datatype.boolean(),
        hasMountainView: faker.datatype.boolean(),
        hasShampoo: faker.datatype.boolean(),
        hasFreeLaundry: faker.datatype.boolean(),
        hasAirConditioner: faker.datatype.boolean(),
        hasWifi: faker.datatype.boolean(),
        hasBarbeque: faker.datatype.boolean(),
        hasFreeParking: faker.datatype.boolean(),
        userId: randomUser.id,
      };

      const res = await prisma.room.create({
        data: roomData,
      });
    });
  }
}

function getRandomLatitude() {
  const minLatitude = 37.4316;
  const maxLatitude = 37.701;
  return faker.number
    .float({
      min: minLatitude,
      max: maxLatitude,
      precision: 0.000001,
    })
    .toString();
}

function getRandomLongtitude() {
  const minLongtitude = 126.7963;
  const maxLongtitude = 127.1839;
  return faker.number
    .float({
      min: minLongtitude,
      max: maxLongtitude,
      precision: 0.000001,
    })
    .toString();
}

async function seedFaqs() {
  Array.from({ length: 10 }).forEach(async () => {
    const faqData = {
      title: faker.lorem.words(),
      desc: faker.lorem.paragraph(),
    };

    const res = await prisma.faq.create({
      data: faqData,
    });
  });
}

async function main() {
  //   await seedUsers();
  // await seedRooms();
  // await seedFaqs();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
