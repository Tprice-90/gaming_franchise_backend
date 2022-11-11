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