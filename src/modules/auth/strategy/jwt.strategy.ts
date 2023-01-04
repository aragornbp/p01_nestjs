/* eslint-disable prettier/prettier */

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/modules/users/users.service";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor(
    config: ConfigService,
    private userService: UsersService

  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET_KEY')
    })

  }

  async validate(payload: {sub: string, email: string, isAdm: boolean}){
    console.log({payload})
    const {sub, email} = payload
    const user = await this.userService.find(email)
    delete user.password
    return user
  }
}