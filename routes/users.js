const express = require("express");
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/user/profile", (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.patch("/user/profile/edit", requireAuth, async (req, res, next) => {
  const id = req.session.currentUser._id

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ message: "id is not valid"})
  }

  const toUpdate = req.body;

  try {
    const updated = await User.findByIdAndUpdate(id, toUpdate, {
      new: true,
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json(err)
  }

});

router.delete('/user/profile/delete', requireAuth, async (req, res, next) => {
  const id = req.session.currentUser._id

  try {
    User.findByIdAndDelete(id)
    return res.status(200)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }

})

module.exports = router;
