/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { compare, compareSync } from 'bcrypt';
import { UserEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import {JwtService} from '@nestjs/jwt'
import { AuthDto } from './dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService
  ){}
  
  async signin(body: AuthDto) {

    const user = await this.userService.find(body.email)

    //throw an error if user doesnt exist
    if (!user) {
      throw new ForbiddenException('Credencials incorrect');
    }
    //compare password
    const pwMatches = await compare(body.password, user.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credencials incorrect');
    }

    return this.signToken(user.id, user.email, user.isAdm);
  }

  async signToken(userId: string, email: string, isAdm:boolean): Promise<{access_token: string}> {
    const payload = {
      sub: userId,
      email,
      isAdm
    };
    const secret = this.config.get('SECRET_KEY');
    
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    return { access_token: token};
  }


}

