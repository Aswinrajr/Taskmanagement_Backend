const express = require('express');
const userRoute = express();
const bcrypt = require("bcrypt");
require("dotenv").config();

const userController = require("../Controller/userController")



userRoute.post("/signup",userController.userRegistration)
userRoute.post("/login",userController.userLogin)

module.exports= userRoute

