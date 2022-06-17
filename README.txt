+ init and run project
- with yarn
  yarn
  yarn dev:watch

- with npm
  npm install
  npm run dev:watch


+ Datasource info (config in 'src/datasource/index.ts')
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root", (change with your username) 
  password: "", (change with your password)
  database: "stdio",
  entities: [User, Post, Category],
  synchronize: true,
  logging: false


+ url: http://localhost:8080

+ API route:
- Auth route: POST /auth/register (create account) 
              POST /auth/login (login)
	      POST /auth/change_password (change password)

- Category route: POST /create_category (create a category)

- Post route: POST /create_post?category="category_name"&userId="userId" (create a post)
              GET /get_post (get post as public status)
	      GET /get_post/:userid?type="status" (get post which belong to who write it and status of the post)
              PUT /update_post/:post_id (update post)
	      PUT /change_status?post_id="post_id"&change_status="status_to_change" (change status of a post)
              DELETE /delete_post/:post_id (delete a post depend on the post_id that has been chosen to delete)

+ database name: stdio (create it before import the database)


...




