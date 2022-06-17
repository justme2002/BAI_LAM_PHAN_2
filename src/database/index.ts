import { dataSource } from "../datasource";

const connectDB = async () => {
  try {
    await dataSource.initialize()
    console.log("connect to mysql DB with DB name is 'stdio'")
  } catch (error) {
    console.log(error)
  }
}

export { connectDB }