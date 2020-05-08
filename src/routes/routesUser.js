module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render("user/signin", {
            message: req.flash("signinMessage")
        });
    });

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/recordGrade",
        failureRedirect: "/",
        failureFlash: true
    }));

    app.get('/signup', (req, res) => {
        res.render("user/signup", {
            message: req.flash("signupMessage")
        });
    });

    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/recordGrade",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

};