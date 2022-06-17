import { DataSource } from 'typeorm'
import { Category } from '../entities/Category'
import { Post } from '../entities/Post'
import { User } from '../entities/User'

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "stdio",
  entities: [User, Post, Category],
  synchronize: true,
  logging: false
})

export { dataSource }