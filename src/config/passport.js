const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //Signup
    passport.use("local-signup", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({'local.email': email}, function (err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, req.flash("signupMessage", "The email is already taken"));
            } else {
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function (err) {
                    if (err) { throw err; }
                    return done(null, newUser);
                });
            }
        });
    }));

    //Signin
    passport.use("local-signin", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        await User.findOne({"local.email": email}, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, req.flash("signinMessage", "Not user found"));
            } 
            if (!user.validatePassword(password)) {
                return done(null, false, req.flash("signinMessage", "Wrong password"));
            }
            return done(null, user);
        });
    }));
};

