/**
 * Created by mrasmussen on 8/24/14.
 */

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// db.user.insert({ "local" : { "email" : "mattras2@gmail.com", "password" : "happy" }})

// use monk
var monk = require("monk");
var db = monk('localhost:27017/leaderboard');
var User = db.get('user');

var bcrypt   = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log(user._id);
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // methods ======================
    // generating a hash
    passport.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    passport.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                //var User = db.get('user');
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if there is already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser            = {};
                        newUser.local      = {};

                        // set the user's local credentials
                        newUser.local.email    = email;
                        newUser.local.password = passport.generateHash(password);
                        //console.log(JSON.stringify(newUser));
                        // save the user
                        User.insert(newUser, function (err, user) {
                            if (err)
                                throw err;
                            console.log("Successful signup.");
                            //console.log(JSON.stringify(doc));
                            return done(null, user);
                        });
                    }

                });

            });

        }));

};
