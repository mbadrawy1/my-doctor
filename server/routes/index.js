const express = require("express");
const userController = require("../controllers/userController");
const { userValidatorRules, validate } = require("../middlewares/validator");
const isLoggedIn = require("../middlewares/auth");
const doctorController = require("../controllers/doctorController");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

//User routes
router.post(
  "/account/signup",
  userValidatorRules(),
  validate,
  userController.register
);
router.post("/account/login", userController.login);
router.get("/account/me", isLoggedIn, userController.me);
router.get("/account/profile", isLoggedIn, userController.getProfile);

//update user
router.put("/update", isLoggedIn, userController.updateUser);

//delete user
router.delete("/delete", isLoggedIn, userController.deleteUser);

//get all users
router.get("/users", isLoggedIn, userController.getAllUsers);

//Doctor routes
router.get("/doctors", doctorController.index);

module.exports = router;
