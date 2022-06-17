import { Express } from 'express'

const initPort = (app: Express, port: number) => {
  app.listen(port || process.env.PORT, () => console.log(`http://localhost:${port} has been init-ed`))
}

export { initPort }