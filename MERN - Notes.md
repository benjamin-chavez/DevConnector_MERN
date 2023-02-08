# DEVCONNECTOR

##### 1. Create Git Ignore File and add Node Modules to it

```
touch .gitignore
echo "node_modules/">> .gitignore
```

##### 2. Create a package.json file:

```
npm init
```

This will prompt the following:

```
# Follow up prompt:
package name: (devconnector_mern)
version: (1.0.0)
description: Social network for developers
entry point: (index.js) server.js
test command:
git repository: (https://github.com/bmchavez/DevConnector_MERN.git)
keywords:
author: Ben Chavez
license: (ISC) MIT
```

##### 3. Install Regular Dependencies:

- express - Backend framework
- express-validator - For validation
- bcryptjs - password encryption
- config - global variables
- gravatar - profile avatars
- jsonwebtoken - JWT token validation
- mongoose - layer on top of database for simpler interaction
- request - allows us to make http requests to 3rd party APIs (DEPRECATED)
- axios - Promise based HTTP client for the browser and node.js (to replace request)

```
npm i express express-validator bcryptjs bcryptjs config gravatar jsonwebtoken mongoose axios
```

##### 3. Install DEV Dependencies:

- nodemon - Continuously watches server for changes so we don't have to refresh
- concurrently - Allows us to run the backend express server AND the frontend React server w/ one command

```
npm i -D nodemon concurrently
```

##### 4. Create our main entry file:

```
touch server.js
```

Add boilerplate server code to `server.js`:

```javascript
const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

You can now run the server w/ command `node server`.

5. Add `start` and `server` NPM Scripts to `package.json`:

```json
"scripts": {
  "start": "node server",
  "server": "nodemon server",
  ...
},
```

To run these scripts run (Note: This command replaces `node server` from step 4):

```bash
npm run server
```

6. Create `config` folder and `default.json` file:

   - This uses the `config` npm dependency to create global application variables

   ```cmd
   mkdir -p config && touch $_/default.json
   ```

   - Add your `"mongoURI"` variable that you pull from your database on Mongo Atlas.

7. Create `config/db.js` file:

   ```
   touch config/db.js
   ```

   Add basic database configuration code to `config/db.js` file:

   ```javascript
   const mongoose = require("mongoose");
   const config = require("config");
   const db = config.get("mongoURI");

   // mongoose.connect(db)
   const connectDB = async () => {
     try {
       await mongoose.connect(db);

       console.log("MongoDB Connected...");
     } catch (err) {
       console.log(err.message);
       // Exit process with failure
       process.exit(1);
     }
   };

   module.exports = connectDB;
   ```

   Add the following lines to your `server.js` file to connect it to your database:

   ```js
   const connectDB = require("./config/db");

   ...

   // Connect Database
   connectDB();
   ```

   Test by running `npm run server` in the terminal to run the server. You should see `MongoDB Connected...` as part of the terminal response.

```

```

8. Create Routes

   - Create `routes/api/` directory and corresponding route files:

   ```bash
   mkdir -p routes/api && touch $_/users.js $_/auth.js $_/profile.js $_/posts.js
   ```

   - Update each new route file with the following boilerplate:

   ```js
   const express = require("express");
   const router = express.Router();

   // @route   GET api/<route>
   // @desc    Test route
   // @access  Public
   router.get("/", (req, res) => res.send("<route> route"));

   // Export the router
   module.exports = router;
   ```

   - Add these new Routes to `server.js` file:

   ```js
   // Define Routes
   app.use("/api/users", require("./routes/api/users"));
   app.use("/api/aut", require("./routes/api/auth"));
   app.use("/api/profile", require("./routes/api/profile"));
   app.use("/api/posts", require("./routes/api/posts"));
   ```

9. TODO:

#

```
















```

#

#

#

#

# PROSHOP

Setup:
From the frontend:
cmd: yarn create react-app my-app
cmd: yarn add styled-components
cmd: yarn add axios
cmd: yarn add redux
cmd: yarn add react-redux
cmd: yarn add redux-thunk
cmd: yarn add redux-devtools-extension
cmd: yarn add react-paypal-button-v2
cmd: yarn add react-helmet

Git Repo:
Remove the git repo because it is in the front end and we want it in the root
cmd: rm -rf .git

    move the .git file into the root as well.

cmd: yarn add react-bootstrap

cmd: yarn add react-router-dom
cmd: yarn add react-router-bootstrap

From the Root:
cmd: yarn init
cmd: yarn add express
cmd: yarn add --dev nodemons
cmd: yarn add --dev concurrently
cmd: yarn add dotenv
cmd: yarn add mongoose
cmd: yarn add colors
cmd: yarn add bcryptjs
cmd: yarn add express-async-handler
cmd: yarn add jsonwebtoken
cmd: yarn add multer
cmd: yarn add morgan

cmd: yarn add react-bootstrap-table-next --save

Misc.

- Using react dev tools is good if you are using the context API, but since we are using redux, we will use the redux dev tools

- When you want to bring redux state into a component, you need to import useSelector from 'react-redux'
- When you want to call and action on redux state, you need to import useDispatch from 'react-redux'

\*When creating submitHandlers, you use preventDefault when you are submitting a from. You could probably spend some time figuring out why this is exactly.

TODO:

- Review exactly what mongoose is
- React Hooks
  - In general, what exactly is a hook?
  - useState
  - useEffect
- When importing in react, why do some things need to be in curly braces and others dont? ie:
  "import {Link} from 'react-router-dom';
  vs.
  "import Item from '../items';
- Review how async await works and how thunk works by putting an async function in the body of another function (i think it does that?).
- why do we use the underscore for ".\_id" again?
- For future reference, it looks like you could use Amazon S3 buckets for cloud storage. You could use this for image uploads similar to cloudinary. Wondering if this could potentially be the route for ableton file storage too?
- "add moment to clean up the dates" brad said this. find out what moment is
- look up url naming conventions. should it be '/orders/:id' or '/order/:id'
- database cart persists either in local storage or on database even after user is deleted
- cart is not cleared when order is placed
- my orderlist is not updated on redirect after order is placed.
- Review that hacking vid to see if the user token is safe or not
- add edit and delete actions for reviews
- How do the spread operate work and why exactly do we need it:
  - {[...Array(pages).keys()].map()}
- review async await in js in general and specifally the placement of each of those keywords in functions
- types of js function styles
- Is there a good methodology behind ordering the routes in react app.js?
- Difference between:
  - import { Link } from 'react-router-dom';
    AND
  - import { LinkContainer } from 'react-router-bootstrap';
-

BUGS:

- if you run the server with a user already logged in via localStorage, then when you try to create an order, you get an error that says "Cannot read property '\_id' of null".
- Fix all currencies to fixed decimal place of 2
- fix currency formatting on
  - cart screen
  - product show screen
  - order screen
- Duplicate items in cart from local localStorage
- when clearing the database, if i register a new user with the same name as a previous user, the data pulls from local storage as if the user already existed.
- clearing the database does not clear local storage.
- Image upload
  - saves the image to the database before the product is actually updated
  - when a product is deleted the image is not deleted. (solving this might solve the previous image upload bug too)
  - an error message/danger alert is not shown if the file type is not an image. Instead it allows the client to save the new product with a default image, which it should not do.
- Two loaders show up on the /admin/productlist screen.

### WORKFLOW:

#### Backend:

1. Add controller function
2. Add Route
3. Add Model Routes to server.js (only if not already added for an existing route)

#### Frontend:

1. Add constants
2. Add Reducers
3. Add Reducer to store
4. Add Actions
5. Add functionality to the screen so user can perform the new action
