import express, { Request, Response } from 'express'
import { dataSource } from '../datasource'
import { Category } from '../entities/Category'
const CategoryController = express.Router()


//create_category_route
CategoryController.post("/create_category", async (req: Request, res: Response) => {
  const { name, avatar } = req.body
  try {
    const CategoryRepository = dataSource.getRepository(Category)

//create category
    const category = new Category(name, avatar)
    await CategoryRepository.save(category)

    res.status(200).json({
      success: true,
      message: "new category's created",
    })

  } catch (error) {
    console.log(error)
  }
})

export { CategoryController }