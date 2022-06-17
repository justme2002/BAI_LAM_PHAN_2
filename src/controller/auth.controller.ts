import express, { Request, Response } from 'express'
import argon2 from 'argon2'
import { dataSource } from '../datasource'
import { User } from '../entities/User'
import { generateAccessToken } from '../libs/token'
const AuthController = express.Router()

AuthController.get("/test", (req, res) => res.json({ success: true, message: "test_route"}))


//register route 
AuthController.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, username, age, gender } = req.body
    
//hash and create user after hash password
    const hashPassword = await argon2.hash(password)
    const user = new User(email, hashPassword, username, age, gender)
    if (gender === "male") {
      user.gender = true
    } else if (gender === "female") {
      user.gender = false
    }
    const userRepo = dataSource.getRepository(User)
    await userRepo.save(user)

//generate access token
    const payload = {
      id: user.id,
      email,
      username: user.username
    }
    const accessToken = generateAccessToken(payload, process.env.ACCESS_TOKEN)

    res.status(200).json({
      success: true,
      message: "create a new user successfully",
      accessToken
    })

  } catch (error) {
    console.log(error)
    res.status(404).json({
      success: false,
      message: "can't create user",
    })
  }
})

//login_route
AuthController.post("/login", async (req: Request, res: Response) => {
  try {

//verify user and login
    const { email, password } = req.body
    const UserRepository = dataSource.getRepository(User)
    const getUser = await UserRepository.findOneBy({ email })
    const verifyPassword = await argon2.verify(getUser.password, password)
    if (!verifyPassword) return res.sendStatus(401)

//generate access token
    const payload = {
      id: getUser.id,
      email,
      username: getUser.username
    }
    const accessToken = generateAccessToken(payload, process.env.ACCESS_TOKEN)

    return res.status(200).json({
      success: true,
      message: "a user has logged to system",
      accessToken
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      success: false,
      message: "unknown error"
    })
  }
})

//change password route
AuthController.post("/change_password", async (req: Request, res: Response) => {
  try {
    const { email, oldPassword, newPassword } = req.body
    const UserRepository = dataSource.getRepository(User)
  
//get email and verify old password
    const getUserByEmail = await UserRepository.findOneBy({ email })
    if (!getUserByEmail) return res.status(401).json({
      success: false,
      message: "user with this email is not exist"
    })

    const verifyPassword = await argon2.verify(getUserByEmail.password, oldPassword)
    if (!verifyPassword) return res.status(401).json({
      success: false,
      message: "old password wrong"
    })

//change password
    const hashPassword = await argon2.hash(newPassword)
    await UserRepository.createQueryBuilder().update(User).set({
      password: hashPassword
    }).where("email = :email", { email }).execute()

    res.status(200).json({
      success: true,
      message: "password changed"
    })


  } catch (error) { 
    console.log(error)
    res.status(404).json({
      success: false,
      message: "unknown error"
    })
  }
})

export { AuthController }