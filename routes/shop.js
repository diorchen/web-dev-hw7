const express = require("express");
const { check, validationResult} = require("express-validator/check");
const auth = require('../middleware/auth');
const router = express.Router();

const User = require("../model/User");

router.post("/add", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      user.shoppingList.push(req.body.item);
      await user.save()
      res.json(user.shoppingList);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

router.get('/list', auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user.shoppingList);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

router.delete("/delete", auth, async(req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        user.shoppingList = user.shoppingList.filter((item) => item != req.body.item);
        await user.save();
        res.json(user.shoppingList);
      } catch (e) {
        console.log(e);
        res.send({ message: "Error in Fetching user" });
      }
    });

module.exports = router;