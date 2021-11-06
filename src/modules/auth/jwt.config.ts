import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'
import { authEnv } from './auth.env'

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(@Inject(authEnv.KEY) private readonly env: ConfigType<typeof authEnv>) {}

  createJwtOptions(): JwtModuleOptions {
    return { secret: this.env.jwtSecret, signOptions: { expiresIn: this.env.jwtExp } }
  }
}
