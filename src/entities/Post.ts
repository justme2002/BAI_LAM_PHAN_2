import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity()
class Post {
  
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    type: "varchar",
    length: 255
  })
  title: string

  @Column({
    type: "varchar",
    length: 255
  })
  description: string

  @Column({
    type: "varchar",
    length: 255
  })
  content: string

  @Column({
    type: "varchar",
    length: 255,
    default: "public"
  })
  status: string

  @Column({
    type: "varchar",
    length: 255
  })
  avatar: string

  @ManyToOne(() => Category, (category) => category.posts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  category: Category

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User
  

  constructor(title: string, description: string, content: string, avatar: string) {
    this.title = title
    this.description = description
    this.content = content
    this.avatar = avatar
  }
}

export { Post }


