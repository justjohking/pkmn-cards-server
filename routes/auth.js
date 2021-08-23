const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Collection = require("../models/Collection");

const salt = 10;

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((userDocument) => {
      if (!userDocument) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = bcrypt.compareSync(
        password,
        userDocument.password
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      req.session.currentUser = {
        // role: "userDocument.role",  // if you need to handle roles
        _id: userDocument._id,
      };

      res.redirect("/api/users/profile");
    })
    .catch(err => {
      console.log(err)
    });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).json({ message: "Email already taken" });
    } 
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = { email, lastName, firstName, password: hashedPassword };

    const newlyCreatedUser = await User.create(newUser);

    Collection.create({type: "Buy", owner: newlyCreatedUser._id})

    res.status(201).json(newlyCreatedUser)

  } 
  catch (error) {next(error)}
    
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (error) {
    if (error) next(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

router.get("/isLoggedIn", async (req, res, next) => {
  try {
    const dbRes = await User.findById(req.session.currentUser);
    res.status(200).json(dbRes);
  } catch (error) {next(error)}
})

module.exports = router;
