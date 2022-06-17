import jwt from 'jsonwebtoken'

interface Payload {
  id: string
  email: string
  username: string
}

const generateAccessToken = (payload: Payload, signature: string) => {
  const accessToken = jwt.sign(payload, signature)
  return accessToken
}

export { generateAccessToken }