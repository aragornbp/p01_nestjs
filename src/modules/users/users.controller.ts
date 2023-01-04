/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UsersService } from './users.service';

@Controller('users')

export class UsersController {
  constructor(private userService: UsersService){}

  @Post()
  async create(@Body() payload: CreateUserDto){
    return this.userService.create(payload)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index(){
    return this.userService.index()
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updated(@Param('id', new ParseUUIDPipe()) id:string, @Body() payloud: UpdateUserDto){
    return this.userService.update(id, payloud)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async solfDelete(@Param('id', new ParseUUIDPipe()) id:string){
    return this.userService.delete(id)
  }
}
