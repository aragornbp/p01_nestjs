/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';



@Controller('login')
export class AuthController {
  constructor(
    private authService: AuthService
  ){}


  @Post()
  async login(@Body() body:AuthDto){
    return await this.authService.signin(body)
  }
}

