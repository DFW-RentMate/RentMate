import 'dotenv/config';

export default {
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },

  datasource: {
    url: process.env.DATABASE_URL,
  },
};
