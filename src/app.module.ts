import { authEnv } from './modules/auth/auth.env';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import LogsMiddleware from './common/logger/logger.middleware';
import { baseEnv, baseEnvConfig } from './config/base.config';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         ...baseEnvConfig,
         isGlobal: true,
         load: [baseEnv, authEnv],
      }),
      AuthModule,
   ],
   controllers: [AppController, AuthController],
   providers: [AppService],
})
export class AppModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LogsMiddleware).forRoutes('*');
   }
}
