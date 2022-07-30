import express, { Request, Response } from 'express'
import { dataSource } from '../datasource'
import { Category } from '../entities/Category'
import { Post } from '../entities/Post'
import { User } from '../entities/User'
import { protectedRoute } from '../middleware/authMiddleware'
const PostController = express.Router()

//create post route
PostController.post("/create_post", protectedRoute, async (req: Request, res: Response) => {
  try {
    const { title, description, content, avatar } = req.body
    const { category, userId } = req.query

    const PostRepository = dataSource.getRepository(Post)
    const UserRepository = dataSource.getRepository(User)
    const CategoryRepository = dataSource.getRepository(Category)

//get current user who will upload post and current category to put into it
    const getUserToUploadPost = await UserRepository.findOneBy({ id: userId.toString() })
    const getCategoryToUploadPost = await CategoryRepository.findOneBy({ name: category.toString() })

//create post
    const post = new Post(title, description, content, avatar)
    post.user = getUserToUploadPost
    post.category = getCategoryToUploadPost
    post.status = category.toString()

    if (userId === req.id) {
      await PostRepository.save(post)
    }

    res.status(200).json({
      success: true,
      message: "created a new post"
    })

  } catch (error) {
    console.log(error)
    res.status(404).json({
      success: false,
      message: "unknown error"
    })
  }
})


//get post (as public status)
PostController.get("/get_post", protectedRoute, async (req: Request, res: Response) => {
  try {
    const PostRepository = dataSource.getRepository(Post)
    const posts = await PostRepository.find({
      where: {
        status: "public"
      }
    })

    res.status(200).json({
      success: true,
      message: "get posts",
      posts
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      success: false,
      message: "unknown error"
    })
  }
})

//get exact post with ID
PostController.get("/get_post/:id", protectedRoute, async (req: Request, res: Response) => {

  const { id } = req.params

  try {
    const PostRepository = dataSource.getRepository(Post)
    const post = await PostRepository.findOne({
      where: {
        id
      },
      relations: {
        category: true,
        user: true
      }
    })

    res.json({
      success: true,
      message: "get post successfully",
      post
    })

  } catch (error) {
    console.log(error)
    res.status(404).json({
      success: false,
      message: error
    })
  }
}) 


//get post route (belong to user who uploaded it)
PostController.get("/get_post/:userid", async (req: Request, res: Response) => {
  try {
    const { type } = req.query
    const { userid } = req.params
    const PostRepository = dataSource.getRepository(Post)

    switch (type) {
// status: all
      case "all":
        const posts = await PostRepository.find({
          where: {
            user: {
              id: userid
            }
          },
          relations: {
            user: true,
            category: true
          }
        })

        return res.status(200).json({
          success: true,
          message: "get all posts",
          posts
        })
// status: public
      case "public": {
        const posts = await PostRepository.find({
          where: {
            user: {
              id: userid
            },
            status: type
          },
          relations: {
            user: true,
            category: true
          }
        })

        return res.status(200).json({
          success: true,
          message: "get public posts",
          posts
        })
      }
// status: draft
      case "draft": {
        const posts = await PostRepository.find({
          where: {
            user: {
              id: userid
            },
            status: type,
          },
          relations: {
            user: true,
            category: true
          }
        })
        return res.status(200).json({
          success: true,
          message: "get draft posts",
          posts
        })
      }

      default:
        return res.status(200).json({
          success: true,
          message: "no posts"
        })
    }

  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "unknown error"
    })
  }
})


//update post route
PostController.put("/update_post/:post_id", async (req: Request, res: Response) => {
  try {
    const { title, description, content, avatar } = req.body
    const { post_id } = req.params
    const PostRepository = dataSource.getRepository(Post)

//update post
    const updatePost = await PostRepository
                              .createQueryBuilder()
                              .update(Post)
                              .set({ title, description, content, avatar })
                              .where("id = :id", {id: post_id})
                              .execute()
    res.status(200).json({
      success: true,
      message: "a post has been updated",
      updatePost
    })

  } catch (error) {
    console.log(error)
    res.status(404).json({
      success: false,
      message: "unknown error"
    })
  }
})  


//change post status route
PostController.put("/change_status", async (req: Request, res: Response) => {
  try {
    const { post_id, change_status } = req.query

    const PostRepository = dataSource.getRepository(Post)
    const CategoryRepository = dataSource.getRepository(Category)
    const categoryId = await CategoryRepository.findOneBy({ name: change_status.toString() })

//update post status
    const updatePost = await PostRepository
                              .createQueryBuilder()
                              .update(Post)
                              .set({ status: change_status.toString(), category: categoryId })
                              .where("id = :id", {id: post_id})
                              .execute()
  
    res.status(200).json({
      success: true,
      message: "update status of a post",
      updatePost
    })

  } catch (error) {
    console.log(error)
    res.status(404).json({
      success: false,
      message: "unknown error"
    })
  }
})


//delete post route
PostController.delete("/delete_post/:post_id", async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params
    const PostRepository = dataSource.getRepository(Post)
    const post = await PostRepository.findOneBy({ id: post_id })

//delete post
    await PostRepository.delete(post)

    res.status(200).json({
      success: true,
      message: "delete post"
    })

  } catch (error) {
    console.log(error)
    res.status(404).json({
      success: false,
      message: "unknown error"
    })
  }
}) 




export { PostController }