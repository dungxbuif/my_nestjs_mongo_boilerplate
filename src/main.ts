import { ClassSerializerInterceptor, ValidationPipe, INestApplication } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './common/exception.filter';
import { BackendLogger } from './common/logger/BackendLogger';
import { baseEnv, BASE_ENV } from './config/base.config';
import * as cookieParser from 'cookie-parser';

class SwaggerApi {
   static inti(app: INestApplication) {
      const config = new DocumentBuilder()
         .setTitle('Tour Vr')
         .setDescription('TourVR API description')
         .setVersion('1.0')
         .addBearerAuth()
         .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);
   }
}

async function bootstrap(logger: BackendLogger) {
   const app = await NestFactory.create(AppModule);
   app.enableCors({ origin: '*' });
   app.use(cookieParser());

   // Filter out unwanted fields in [REQUEST]
   app.useGlobalPipes(
      new ValidationPipe({
         transform: true,
         whitelist: true,
         forbidNonWhitelisted: true,
         transformOptions: { enableImplicitConversion: true },
      }),
   );

   // Filter out @Exclude() fields to [RESPONSE]
   app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

   //catch exception
   const { httpAdapter } = app.get(HttpAdapterHost);
   app.useGlobalFilters(new ExceptionsFilter(httpAdapter));

   SwaggerApi.inti(app);

   const configService = app.get(ConfigService);
   const base = configService.get<ConfigType<typeof baseEnv>>(BASE_ENV);
   await app.listen(base.port);
   logger.log(`Server is running at ${await app.getUrl()}...`);
}
bootstrap(new BackendLogger(bootstrap.name));
