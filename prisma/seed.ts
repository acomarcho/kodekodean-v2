import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  await prisma.chunk.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.unit.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash("helloworld", 12);

  await prisma.user.create({
    data: {
      id: 1,
      name: "Test User",
      email: "test@test.com",
      password: hashedPassword,
    },
  });

  await prisma.course.createMany({
    data: [
      {
        id: 1,
        title: "Pemrograman fungsional menggunakan Haskell",
        description:
          "Belajar pemrograman menggunakan paradigma fungsional. Anda akan mempelajari gaya pemrograman fungsional, fungsi rekursif, dan fungsi lambda.",
        source: "IF1210 Dasar Pemrograman",
        rank: 1,
      },
      {
        id: 2,
        title: "Pemrograman prosedural menggunakan Python",
        description:
          "Belajar pemrograman menggunakan paradigma prosedural. Anda akan mempelajari gaya pemrograman prosedural dan pemrosesan file.",
        source: "IF1210 Dasar Pemrograman",
        rank: 2,
      },
    ],
  });

  await prisma.unit.createMany({
    data: [
      {
        id: 1,
        courseId: 1,
        description: "Paradigma fungsional dan Haskell",
        rank: 1,
      },
      {
        id: 2,
        courseId: 1,
        description: "Rekursi sederhana pada Haskell",
        rank: 2,
      },
      {
        id: 3,
        courseId: 1,
        description: "Pemrosesan list pada Haskell",
        rank: 3,
      },
      {
        id: 4,
        courseId: 1,
        description: "Fungsi lambda dan fungsi sebagai parameter",
        rank: 4,
      },
    ],
  });
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
