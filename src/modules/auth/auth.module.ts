import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { JwtConfig } from './jwt.config';

@Module({
   imports: [
      PassportModule,
      JwtModule.registerAsync({
         useClass: JwtConfig,
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
   exports: [AuthService],
})
export class AuthModule {}
