const Users = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const name = await Users.findOne({ username });

      if (name) {
        return res.status(400).json({ msg: "The username already exists." });
      }

      const user = await Users.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "The email already exists." });
      }

      if (password.length < 6) {
        return res.status(400).json({
          msg: "The password is small, at least 6 characters minimun.",
        });
      }

      // Bcrypt
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await new Users({
        username,
        email,
        password: passwordHash,
      });

      await newUser.save();

      const accesstoken = await createAccessToken({ id: newUser._id });
      const refreshtoken = await createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "The user does not exist." });
      }

      // Bcrypt

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: "The password is incorrect.",
        });
      }

      const accesstoken = await createAccessToken({ id: user._id });
      const refreshtoken = await createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });

      res.json({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(400).json({ msg: "Please login or Register" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
