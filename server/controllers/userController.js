const bcrypt = require("bcryptjs");
const models = require("../models");
const jsonwebtoken = require("jsonwebtoken");

exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    userType,

    specialization,
    address,
    workingHours,
    phone,
  } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      name,
      email,
      password: hashPassword,
      userType,
    });

    if (userType === "doctor") {
      const profile = await models.Profile.create({
        userId: user.id,
        specialization,
        address,
        workingHours,
        phone,
      });
    }
    res.status(200).json({ message: "User created successfully", user });
  } catch (e) {
    res.status(500).json({ message: "An error occurred", error: e.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const authSuccess = await bcrypt.compare(password, user.password);
    if (!authSuccess) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const token = jsonwebtoken.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET
    );
    res.status(200).json({ accessToken: token });
  } catch (e) {
    res.status(500).json({ message: "An error occurred", error: e.message });
  }
};

exports.me = (req, res) => {
  const user = req.currentUser;
  res.json(user);
};

exports.getProfile = async (req, res) => {
  try {
    const result = await models.User.findOne({
      where: { id: req.currentUser.id },
      include: { model: models.Profile, as: "profile" },
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: "An error occurred", error: e.message });
  }
};

exports.updateUser = async (req, res) => {
  const {
    name,
    email,
    password,
    userType,
    specialization,
    address,
    workingHours,
    phone,
  } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    await models.User.update(
      {
        name,
        email,
        password: hashPassword,
        userType,
      },
      {
        where: { id: req.currentUser.id },
      }
    );

    if (userType === "doctor") {
      await models.Profile.update(
        {
          specialization,
          address,
          workingHours,
          phone,
        },
        {
          where: { userId: req.currentUser.id },
        }
      );
    }

    res.status(200).json({ message: "تم تحديث معلوماتك بنجاح" });
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await models.User.destroy({
      where: { id: req.currentUser.id },
    });

    res.status(200).json({ message: "تم حذف حسابك بنجاح" });
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({
      include: { model: models.Profile, as: "profile" },
      attributes: { exclude: ["password"] }, // Excludes passwords from the response
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: "An error occurred", error: e.message });
  }
};
