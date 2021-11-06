import { registerAs } from '@nestjs/config';

type AuthEnvType = {
   jwtSecret: string;
   jwtExp: number;
   jwtRefreshExp: number;
};

const AUTH_ENV = 'auth';

export const authEnv = registerAs(
   AUTH_ENV,
   (): AuthEnvType => ({
      jwtSecret: process.env.JWT_SECRET || '',
      jwtExp: parseInt(process.env.JWT_EXPIRE || `${60 * 60}`),
      jwtRefreshExp: parseInt(process.env.JWT_REFRESH_EXPIRE || `${60 * 60 * 24}`),
   }),
);
