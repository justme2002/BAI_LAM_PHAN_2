import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'


interface Decoded  {
  id: string,
  username: string,
  email: string
}



const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization")
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) return res.sendStatus(401)

  try { 
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN) as Decoded
    req.id = decoded.id

    next()

  } catch (error) {
    console.log(error)
  }
}

export { protectedRoute }