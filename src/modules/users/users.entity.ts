/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserEntity {
  @Column()
  name: string

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @Column()
  isAdm: boolean

  @Column({default: true})
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @CreateDateColumn()
  updatedAt: Date

  @PrimaryGeneratedColumn('uuid')
  id: string

}