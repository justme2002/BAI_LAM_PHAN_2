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

- API example:
- Auth route:
	POST http://localhost:8080/auth/register
	Content-Type: application/json
	{
	  email: user_1@gmail.com
	  password: 123456789
	  username: user1
	  age: 22
	  gender: male
	} 

	POST http://localhost:8080/auth/login
	Content-Type: application/json
	{
	  email: user_1@gmail.com
	  password: 123456789
	}

	POST http://localhost:8080/auth/change_password 
	Content-Type: application/json
	{
	  email: user_1@gmail.com, (if email not found, return code 401)
	  oldPassword: 123456789, (if wrong password, return code 401)
	  newPassword: 987654321
	}

- Category route:
...

- Post route:
	POST http://localhost:8080/create_post?category=public&userId=e2fbdbe3-1e1b-41df-a140-6e155a00fa1e
	GET http://localhost:8080/get_post
	GET http://localhost:8080/get_post/e2fbdbe3-1e1b-41df-a140-6e155a00fa1e?type=public (change type to draft if user wants to see draft post)
	PUT http://localhost:8080/update_post/d8648787-029e-418c-a351-31afbef0aff5
	Content-Type: application-json
	{
	  title: update_title,
	  description: update_description,
	  content: update_content,
	  avatar: update_avatar
	}
	
	PUT http://localhost:8080/change_status?post_id=d8648787-029e-418c-a351-31afbef0aff5&change_status=draft
	DELETE http://localhost:8080/d8648787-029e-418c-a351-31afbef0aff5
	

+ database name: stdio (create it before import the database)


...




