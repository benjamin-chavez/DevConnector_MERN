// We are using axios to create a global header here (We are not making a request with it).

// Notes: The purpose of doing this like this is so that when we have a valid token, we can just send it with every request. As apposed to picking and choosing which requests to send the token with.
import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // If a token is present, then set the `x-auth-token` global header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // If the token is not a real token, then we delete it from the global headers
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
