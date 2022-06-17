import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Post } from './Post'

@Entity()
class Category {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true
  })

  name: string
  
  @Column({
    type: "varchar",
    length: 255
  })
  avatar: string

  @OneToMany(() => Post, (post) => post.category, {
    cascade: true
  })
  posts: Post[]

  constructor(name: string, avatar: string) {
    this.name = name
    this.avatar = avatar
  }
}

export { Category }