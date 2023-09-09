const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  wrapAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      await User.register(user, password);
      req.flash("success_msg", "You are registered");
      res.redirect("/places");
    } catch (error) {
      req.flash("error_msg", error.message);
      res.redirect("/register");
    }
  })
);

module.exports = router;

// app.get("/register", async (req, res) => {
//     const user = new User({
//       email: "user@gmail.com",
//       username: "user1",
//     });

//     const newUser = await User.register(user, "password");
//     res.send(newUser);

//     // User.register(user, 'password', (err, user)=>{
//     //   res.send(user)
//     // })
//   });
