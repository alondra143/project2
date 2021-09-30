const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');
// configuring Passport!
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
     console.log(profile);
    //this is where we get googleId/name/email from
      User.findOne({googleId: profile.id}, function(err, userDoc) {
        if(err) return cb(err); // if there is an error, use cb to go to next line in middle
      // cb is a verify callback that passes information to passport.serializeUser
        if(userDoc) {
          return cb(null, userDoc); // send userDoc to next middleware
        } else {
        // if userDoc is undefined create user
          const newUser = new User(
          {
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });

          newUser.save(function (err) {
            if (err) return cb(err);
           return cb(null, newUser);
          });
        };
      });
    }
  )
);
// user = userDoc done = passport adds id to user's session cookie
// lets us 
passport.serializeUser(function(user, done) {
  done(null, user.id); // storing id in connect.sid
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, userDoc) {
    done(err, userDoc);
  })
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

});



