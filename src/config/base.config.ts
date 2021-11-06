import { ConfigModuleOptions, registerAs } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

export const baseEnvConfig: ConfigModuleOptions = {
   envFilePath: !ENV ? ['.env.dev'] : [`.env.${ENV}`],
};

type EnvType = {
   port: number;
   host: string;
};

export const BASE_ENV = 'base';

export const baseEnv = registerAs(
   BASE_ENV,
   (): EnvType => ({
      host: process.env.API_HOST || '',
      port: parseInt(process.env.PORT || '3000', 10),
   }),
);
