import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authEnv } from './auth.env';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      @Inject(authEnv.KEY) private readonly env: ConfigType<typeof authEnv>,
      private readonly authService: AuthService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: env.jwtSecret,
      });
   }

   async validate(payload: any) {
      // const user = await this.authService.validateUser(payload);
      // if (!user) {
      //    this.logger.debug(`Invalid/expired payload: ${JSON.stringify(payload)}`);
      //    throw new UnauthorizedException(LOGIN_ERR);
      // }
      // return user;
   }
}
