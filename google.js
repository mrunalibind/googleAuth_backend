
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
const axios = require('axios');
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID: '993899016712-vuhgqrljh0rn5q7o6li3d0rt0ti3c60l.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8050/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile)
    let name=profile.displayName;
    let email=profile.emails[0].value;
    // return cb(null, 'user');

    const userData = {
      name,
      email,
    };
    
    // Send a POST request to the backend login route
    axios.post('http://localhost:7080/users/login', userData)
      .then(response => {
        // Handle the response from the backend if needed
        console.log('Response from backend:', response.data);
      })
      .catch(error => {
        // Handle any errors that might occur during the API request
        console.error('Error while sending API request:', error);
      });
  }
));

module.exports=passport;