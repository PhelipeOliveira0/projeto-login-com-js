const passportGoogle = require('passport')
require('dotenv').config()

passportGoogle.serializeUser(function (user, done) {
    done(null, user)
})


passportGoogle.deserializeUser(function (obj, done) {
    done(null, obj)
})



var GoogleStrategy = require('passport-google-oauth20').Strategy;

passportGoogle.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passportGoogle