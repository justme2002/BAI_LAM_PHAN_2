import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Post } from './Post'

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true
  })
  email: string

  @Column({
    type: "varchar",
    length: 255,
    nullable: false
  })
  password: string
  
  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true
  })
  username: string

  @Column({
    type: "int",
    nullable: false
  })
  age: number

  @Column({
    nullable: false
  })
  gender: boolean  

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true
  })
  posts: Post[]

  constructor(email?: string, password?: string, username?: string, age?: number, gender?: boolean){
    this.email = email
    this.password = password
    this.username = username
    this.age = age
    this.gender = gender
  }
}

export { User }