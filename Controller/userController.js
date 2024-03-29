const taskView = require("../Model/taskModel");
const User = require("../Model/userModel");
const bcrypt = require("bcrypt");

const userRegistration = async (req, res) => {
  try {
    console.log("Welcome to user signup");
    const { fullName, email, mobile, password, confirmPassword } = req.body;
    console.log(fullName, email, mobile, password, confirmPassword);
    const userData = await User.findOne({ userEmail: email });

    if (userData) {
      console.log("User exist");
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password hashed", passwordHash);

    const user = new User({
      userName: fullName,
      userEmail: email,
      userMobile: mobile,
      userPassword: passwordHash,
    });

    await user.save();
    console.log("User registered ");
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error in user Signup", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    console.log("Welcome to user login");

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ userEmail: email });

    if (!user) {
      return res.status(401).json({ message: "User is not registered" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.userPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    res.status(200).json({ message:"User login successful" });
  } catch (err) {
    console.log("Error on user login", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
