// Next.js는 코드를 수정할 때마다 화면을 새로고침(Hot-Reload) 해주는 아주 편리한 기능이 있는데, 
// 이때 프리즈마가 계속 새로운 DB 접속 통로를 만들어버리는 문제가 있습니다. 이 통로를 딱 1개만 유지하도록 만들어주는 마법의 파일입니다.

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;