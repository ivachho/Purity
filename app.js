require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//session initial configuration
app.use(session({
  secret: "ssss",
  resave: false,
  saveUninitialized: false
}));

//set up session with passport
app.use(passport.initialize());
app.use(passport.session());

//mongoose code

mongoose.connect("mongodb+srv://admin-Ke:password123!@cluster0.qi4ub.mongodb.net/User?retryWrites=true&w=majority", {
  useNewUrlParser: true
}, {
  useUnifiedTopology: true
});

mongoose.connection
  .once('open', () => console.log('Connected'))
  .on('error', (error) => {
    console.log("Your Error: ", error);
  });
mongoose.set('useUnifiedTopology', true);
mongoose.set("useCreateIndex", true);

// Blacklist Schema
const listSchema = new mongoose.Schema({
  user: String,
  website: String
});

// create user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  accId: String,
  blacklist: [listSchema]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const List = new mongoose.model("List", listSchema);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Google oauth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://childproof.herokuapp.com/auth/google/childproof",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      accId: profile.id,
      username: profile.emails[0].value
    }, function(err, user) {
      return done(err, user);
    });
  }
));

// Google Sign in
app.get("/auth/google",
  passport.authenticate('google', {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/childproof",
  passport.authenticate('google', {
    failureRedirect: "/signIn"
  }),
  function(req, res) {
    res.redirect("/");
  });

// Facebook oauth
passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://www.childproof.herokuapp.com/auth/facebook/childproof",
        profileFields: ['id', 'email', 'first_name', 'last_name']
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            accId: profile.id,
            userName: profile.name.familyName + ' ' + profile.name.givenName
          }, function(err, user) {
              return done(err, user);
            });
          }
  ));

    app.get('/auth/facebook', passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    })
  );

  app.get("/auth/facebook/childproof",
    passport.authenticate('facebook', {
      failureRedirect: "/signIn"
    }),
    function(req, res) {
      res.redirect("/");
    });

    // homepage
    app.get("/", function(req, res) {
      if (req.isAuthenticated()) {
        res.redirect("/blacklist");
      } else {
        res.redirect("/signIn");
      }
    });

    // signin
    app.get("/signIn", function(req, res) {
      res.render("signIn");
    })

    // block list
    app.get("/blacklist", function(req, res) {
      if (req.isAuthenticated()) {
        List.find({
          user: req.user.id
        }, function(err, foundItems) {
          User.findById(req.user.id, function(err, foundUser) {
            if (!err) {
              if (foundUser) {
                foundUser.blacklist = foundItems;
                foundUser.save();
                res.render("site", {
                  newListItems: foundItems
                });
              }
            }
          });
        });
      } else {
        res.redirect("/signIn");
      }
    })

    app.post("/blacklist", function(req, res) {
      const link = req.body.newWebsite;
      const list = new List({
        user: req.user.id,
        website: link
      });
      list.save();
      res.redirect("/blacklist");
    })

    // deleting websites from list
    app.post("/delete", function(req, res) {
      const checkedTask = req.body.checkbox;
      List.findByIdAndRemove(checkedTask, function(err) {
        if (!err) {
          res.redirect("/blacklist");
        }
      })
    })

    // connects to webpage
    app.listen(process.env.PORT || 3000, function() {

    });
