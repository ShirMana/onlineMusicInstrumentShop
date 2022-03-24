const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const { Instrument } = require("../models/instrument");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.put("/edit", auth, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  if (user && req.user._id != user._id) {
    res.status(400).send("this email is already in use");
  }

  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.owner = false;
  user = await user.save();
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("User with this email is already registered");
  user = new User(_.pick(req.body, ["name", "email", "phone", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.owner = false;
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/addToCart", auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  //check if item is already in cart
  let isExist = user.cart.find((cart) => {
    return cart === req.body.itemId;
  });
  if (isExist) res.status(400).send("The item is already in your cart");

  user.cart.push(req.body.itemId);
  user.save();
  res.send();
});

router.delete("/removeFromCart", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  let index = user.cart.findIndex((itemId) => itemId === req.query.itemId);
  if (index > -1) {
    user.cart.splice(index, 1);
    user.save();
  }
  res.send();
});

router.get("/cart", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  let items = await Instrument.find({ _id: { $in: user.cart } });
  res.send(items);
});

module.exports = router;
