15. Continue creating other models...

<!-------------------------------------------------------------------------------------->
<!-------------------------------------- FRONTEND -------------------------------------->
<!-------------------------------------------------------------------------------------->

1. Create a new React application in a Directory named `Frontend` and delete its GIT Repo:

   ```bash
   npx create-react-app@5.0.1 frontend
   cd frontend
   rm -rf .git
   rm .gitignore README.md
   ```

2. Add frontend dependencies within `/frontend` directory:

   - axios - To make HTTP requests (You could also use Fetch API, but axios has additional functionality)
   - react-router-dom -
   - redux -
   - react-redux -
   - redux-thunk - Middleware that allows us to make async requests in our actions
   - redux-devtools-extension -
   - moment - A date and Time library for data/time formatting
   - react-moment - react specific library so that we can use moment within a react component

   ```bash
   npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment
   ```

3. Add Proxy to `frontend/package.json`:

   - This is so that we can make axios requests without having to type `axios.get('/api/<route>')` for every request

   - ```json
     // frontend/package.json
     {
       ...
       "browserslist": {
         ...
       },
       "proxy": "http://localhost:5000"
     }
     ```

- Move back into the `root` directory:

  ```bash
  cd ..
  pwd
  <!-- This should be the root directory -->
  ```

4.  Clean up the unneserary files and folders from the React frontend:

    ```bash
    rm frontend/src/logo.svg frontend/src/index.css frontend/src/App.test.js
    ```

    - Remove the `import './index.css';` line from `frontend/src/index.js`
    - Update the boilerplate code within `frontend/src/App.js` to the following:

      ```js
      import React, { Fragment } from 'react';
      import './App.css';

      const App = () => (
        <Fragment>
          <h1>App</h1>
        </Fragment>
      );

      export default App;
      ```

    - Remove all style code from `frontend/src/App.css` so that the file is empty
    - Delete default comments and Add `FontAwesome` to `frontend/public/index.html` with the following

      ```html
      <script
        src="https://kit.fontawesome.com/bb4c695473.js"
        crossorigin="anonymous"
      ></script>
      ```

5.  Create a new frontend directory at `frontend/src/components/layouts` and create your `Landing` Page and `Navbar` components:

    ```
    mkdir -p frontend/src/components/layouts && touch $_/Landing.js $_/Navbar.js
    ```

    - In each new components type `racfe` and hit tab to create the boilerplate code:

      ```js
      // frontend/src/components/layout/Navbar.js
      import React from 'react';

      const Navbar = () => {
        return <div>Navbar</div>;
      };

      export default Navbar;
      ```

    - Import the new components into your `frontend/src/App.js` file:

      ```jsx
      // frontend/src/App.js
      import React, { Fragment } from 'react';
      import Navbar from './components/layout/Navbar';
      import Landing from './components/layout/Landing';
      import './App.css';

      const App = () => (
        <Fragment>
          <Navbar />
          <Landing />
        </Fragment>
      );

      export default App;
      ```

6.  Add React Router to Frontend:

    - Import React Router into `frontend/src/App.js`

      ```jsx
      // frontend/src/App.js

      import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
      ```

    - If needed create new components that will be used for a route. Example:

      ```jsx
      // frontend/src/components/auth/Register.js

      import React from 'react';

      const Register = () => {
        return (
          <section className="container">
            <div>Register</div>
          </section>
        );
      };

      export default Register;
      ```

    - Add Routes for relevant components:

      ```jsx
      // frontend/src/App.js

      const App = () => (
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      );
      ```

7.  Add The `UseState` Hook to your components

    - Below is an example of a Register user form with the `UseState` Hook

      ```jsx
      import React, { useState } from 'react';

      const Register = () => {
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
          password2: '',
        });

        const { name, email, password, password2 } = formData;

        const onChange = (e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value });

        const onSubmit = (e) => {
          e.preventDefault();
          if (password !== password2) {
            console.log('PASSWORDS DO NOT MATCH');
          } else {
            // register({ name, email, password });
          }
        };

        return (
          <section className="container">
            ...
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              ...
              <input
                type="submit"
                className="btn btn-primary"
                value="Register"
              />
            </form>
            ...
          </section>
        );
      };

      export default Register;
      ```

8.  TODO:

```

```
