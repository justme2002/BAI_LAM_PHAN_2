require("dotenv").config()
import 'reflect-metadata'
import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.raw())


//db
import { connectDB } from './database/index'
connectDB()


//route middleware
import { AuthController } from './controller/auth.controller'
import { PostController } from './controller/post.controller'
import { CategoryController } from './controller/Category.controller'

app.use("/auth", AuthController)
app.use(PostController)
app.use(CategoryController)

//port
import { initPort } from './port'
initPort(app, 8080)