# Gaming Franchises Backend Project

## Goal
I'm attempting to create an ExpressJS backend server to act as an API for Gaming Franchises project.
I will be using MySQL as a database to store and send data. No plans to host this project, this will
be purely for learning purposes.

Will be using a combination of [ExpressJS](https://expressjs.com) Documentation and 
[LogRocket](https://blog.logrocket.com/build-rest-api-node-express-mysql/) tutorial on building a RESTful API with Node Express and MySQL.

## Journey
### 2022/11/11
- Created project repository in GitHub
- Ran `npm init` to create a package-lock file
- Ran `npm install express` to install ExpressJS dependency
- Created index.js to act as server entry

### Curiosity
After adding the const to require Express, there was a tool tip to install @type/express via npm.
Decided to install package with `npm install --save @types/express`. This provides Typescript support
for express project.

- Remembered I needed to first create a database for the project, created database "gaming_franchises"

- Going to first follow ExpressJS documentation's "Hello World" example to test that server will work
    - App will be listening to Port 3000
    - running npm node index.js
    - Console log printed properly
    - Hello world printed to browser after visiting localhost:3000
    - test successful!

- According to the tutorial at LogRocket, this will be using JSON parser middleware thats built in to
  the Express package

### Curiosity
In the tutorial, it suggests to use: express.urlencoded({extended: true}), I want to find out what this 
accomplishes.
From what I understand based on the Express documentation, this function will ensure that incoming request
Content-Types match the type that is set. Extended: true will allow any type to be parsed in the case of
Nested Objects. Without true, parsing will be based off of the QueryString library which does NOT support
nested objects whereas, True bases it of the qs library which does.

- One change that needed to be made is the app.get function:
    - in the Express documentation, uses: res.send()
    - since now we're leveraging json, function needs to be res.json() in order to parse json data
- Testing to make sure no issued arrise from this change
    - after running server and checking localhost:3000, JSON data was presented properly

- Project structure will be fairly simple:
    - routes(dir): contains routing file acting as glue between the services and URI's
    - services(dir): contains db file for MySQL configurations and game service file containing URI mapping
    - config.js: for database configuration
    - helper.js: for any helper functions that may be needed (not sure as of yet)

- Next step is to create the config.js file to setup database connections, making sure to add this to  
  .gitignore
- Also need to install mysql2 package to handle database dependencies with `npm i mysql2`
- Tutorial has section to add pagination for list items, but I will be skipping for now since I want to
  display all items on the page since project is SPA
- Now going to create services/db.js file to handle queries
- Break for today, Next step is to create a service that will handle CRUD functions

### 2022/11/14

- Began by creating the table "games" in the "gaming_franchises" database, columns include:
  - "id" INT UNSIGNED
  - "title" VARCHAR(50) NOT NULL
  - "description" VARCHAR(500) NOT NULL
  - "creator" VARCHAR(100) NOT NULL
  - "imgURL" VARCHAR(1000) NULL   Set the limit high due to taking a url for the image
  - "type" VARCHAR(50) NULL
  - "tags" JSON NULL    Will see how JSON data type works in the case of array type data

- Realized I need a helper file for determining if data exists or not, will be located in
  helper directory named helper.js
- For the gameService.js file, I will be modifying the tutorials function to omit the 
  limiting items from 10. Will include an asynch GET helper function "getAll()"
    - getAll will contain a rows var which will be an await call to the database getting ALL
      rows, data var which will leverage helper.js emptyOrRows function to determine if 
      data exists or not, and a return of data
- Next I will create a route to connect to the database routes/gameRoutes.js which will have
  the router.get function, function will contain a try catch which will either display the
  data with the getAll helper function if successful or throw an error with error.message
  if it fails
- Finally, to finish the GET endpoint, I need to update the index.js file to leverage the
  newly created route, also added an error handling middleware function in case anything 
  goes wrong with fetching the route

### Testing New Route
- First issue found was a syntax mistake in db.js mysql var, was require('mysql/promise'),
  should have been require('mysql2/promise)
- Next issue was unable to find module '../helper', sollution was a mistake in gameService.js
  file when require('../helper'), should have been require('../helper/helper')
- Page loads properly now, though no data is shown since table is empty, otherwise, success!

- Next step is to create a POST endpoint in the gameService.js file
  - method will again be asynchronous, inserting into games table
  - default message variable will be error inserting into database
  - if db.affectedRows returns true, message will update to show successful database query
  - message will be returned
- Create Route will then be added to gameRoutes.js file
  - Route will be an asynchronous function leveraging gameService create function
  - try catch block will handle any errors that occur with adding a game
- Next a PUT function will be created to UPDATE a game entry
- Will try to accomplish this without using the tutorial at first, then compare tutorial sollution
  to my own
  - My code was mostly correct, only error i made was the syntax of the UPDATE statement where I forgot 
    to include an $id var in the function parameters to keep track of what entry is being updated
- Next I will attempt on my own to add the route endpoint in gameRoutes.js and compare to tutorial method
  - I mostly had the right idea in creating the route, had to check tutorial for including the ID of the
    game, needed to add "/:id" to the route parameter and include "req.params.id" in the await function
- Final function will be DELETE, again attempting on my own before comparing to tutorial
  - code matched tutorial perfectly
- At this point final testing can be done with Postman

### 2022/11/27

- While testing connection with [gaming_franchises_frontend](https://github.com/Tprice-90/gaming_franchises_frontend), ran into an issue where CORS access was blocked
- found documentation at [expressjs.com](https://expressjs.com/en/resources/middleware/cors.html) to install and configure cors middleware
  - `npm install cors`
  - in index.js: `let cors = require("cors");`
                 `app.use(cors());`
  - this enables global cors use rather than individual routes
  - fixed the cors issue
  - Forgot to create route for SINGLE game entry

### 2022/12/12

- Issue with json data type for tags, removed column from database as well as all CRUD opperations
- One to many relationship will be needed in order for this functionality to work properly,
  will implement this after further research on how it works with express