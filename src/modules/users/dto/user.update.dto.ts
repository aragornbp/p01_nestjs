/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from "class-validator"

export class UpdateUserDto {
  
  @IsString()
  name?: string
  
  @IsString()
  @IsEmail()
  email?: string
  
  @IsString()
  password?: string
}