/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {hash} from 'bcrypt'
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
    ){}


    async create(payload: CreateUserDto ): Promise<UserEntity> {

      try{
        const { name, email, isAdm, password } = payload;
    
        const passwordHash = await hash(password, 10);
    
        const user = this.userRepository.create({
          name,
          email,
          isAdm,
          password: passwordHash,
        });
    
        await this.userRepository.save(user);
    
        const newUser = await this.userRepository.findOne({
          select: [
            "email",
            "createdAt",
            "id",
            "isActive",
            "isAdm",
            "name",
            "updatedAt",
          ],
          where: { email: email },
        });
    
        return newUser;

      }catch(error){
        throw new ConflictException({ msg: 'email já cadastrado' })
      }
    }
    async index() {
      const users = await this.userRepository.find({
        select: {
          name: true,
          email: true,
          id: true,
          createdAt: true,
          isActive: true,
          isAdm: true,
          updatedAt: true,
        },
      });
  
      return users;
    }
    async delete(id: string) {
      await this.userRepository.save({ id: id, isActive: false });
      const user = this.userRepository.findOneBy({id})
      return user;
    }
    async update (id: string, payload: UpdateUserDto)  {
      await this.userRepository.update(id, payload);
      const user = this.userRepository.findOneBy({id})
      return user;
    }

    async findOrFail(email:string){
      try{
        const user = await this.userRepository.findOneByOrFail({email})
        return user
      }catch(error){
        throw new NotFoundException(error.message)
      }
    }

    async find(email: string){
      const user = await this.userRepository.findOneBy({email})
      return user
    }
  
}

