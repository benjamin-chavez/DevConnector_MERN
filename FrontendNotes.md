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

```

```
