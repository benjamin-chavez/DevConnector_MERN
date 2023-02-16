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
   - uuid -

   ```bash
   npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment uuid
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
      // frontend/src/components/auth/Register.js

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

8.  Optional Example: If you wanted to build the app without `Redux`, then an example api request would look like:

    ```jsx
    // frontend/src/components/auth/Register.js
    ...
    import axios from 'axios';
    ...

    const onSubmit = async (e) => {
      e.preventDefault();
      if (password !== password2) {
        console.log('PASSWORDS DO NOT MATCH');
      } else {
        const newUser = {
          name,
          email,
          password,
        };

        try {
          const config = {
            headers: {
              'Content-Type': 'Application/json',
            },
          };

          const body = JSON.stringify(newUser);

          const res = await axios.post('/api/users', body, config);

          // res.data should be the token:
          console.log(res.data);
        } catch (err) {
          console.error(err.response.data);
        }
      }
    };
    ```

9.  Add Redux to React Frontend

    - Redux gives app level state.
    <!-- - Component Calls Action -> Reducer receives action, updates state and passes state back down. -->

    - Add Redux Store:

      ```jsx
      // frontend/src/setupTests.js

      // TODO: Replace createStore with configureStore: https://redux.js.org/tutorials/fundamentals/part-8-modern-redux
      import { createStore, applyMiddleware } from 'redux';
      import { composeWithDevTools } from 'redux-devtools-extension';
      import thunk from 'redux-thunk';
      import rootReducer from './reducers';

      const initialState = {};

      const middleware = [thunk];

      const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
      );

      export default store;
      ```

    - Add `Provider` to `frontend/src/App.js` file and pass it the newly created `store`:

      - The `Provider` is what actually connects Redux to our React application

      ```jsx
      // frontend/src/App.js

      ...
      // Redux
      import { Provider } from 'react-redux';
      import store from './store';

      ...

      const App = () => (
        <Provider store={store}>
          <Router>
            ...
          </Router>
        </Provider>
      );

      export default App;
      ```

10. Create a `frontend/src/reducers/index.js` file to import and export all of your reducers from one place:

    - Boilerplate code with example `Alert Reducer`:

    ```jsx
    // frontend/src/reducers/index.js

    import { combineReducers } from 'redux';
    import alert from './alertReducer';

    export default combineReducers({
      alert,
    });
    ```

11. Create a `frontend/src/actions/types.js` file to store all of your CONSTANTS:

    - With `Alert` examples:

      ```jsx
      // frontend/src/actions/types.js

      export const SET_ALERT = 'SET_ALERT';
      export const REMOVE_ALERT = 'REMOVE_ALERT';
      ```

12. Create your `action` file(s):

    - Continued `alertAction` example:

      ```jsx
      // frontend/src/actions/alertAction.js

      import uuid from 'uuid';
      import { SET_ALERT, REMOVE_ALERT } from './types';

      // We can do this because we are using the `Thunk` middleware
      export const setAlert = (msg, alertType) => (dispatch) => {
        const id = uuid.v4();
        dispatch({
          type: SET_ALERT,
          payload: { msg, alertType, id },
        });
      };

      export const removeAlert = (msg, alertType) => (dispatch) => {
        const id = uuid.v4();
        dispatch({
          type: REMOVE_ALERT,
          payload: { msg, alertType, id },
        });
      };
      ```

13. Create your `reducer` file(s):

    - A reducer is a function that takes in a piece of state and an action. The action will be dispatched from an actions File.
    - Continued `alert` example:

      ```jsx
      // frontend/src/reducers/alertReducer.js

      import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

      const initialState = [];

      function alertReducer(state = initialState, action) {
        const { type, payload } = action;

        switch (type) {
          case SET_ALERT:
            return [...state, payload];
          case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload);
          default:
            return state;
        }
      }

      export default alertReducer;
      ```

```

```
