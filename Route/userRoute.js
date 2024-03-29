const express = require('express');
const userRoute = express();
const bcrypt = require("bcrypt");
require("dotenv").config();

const userController = require("../Controller/userController")



userRoute.post("/signup",userController.userRegistration)
userRoute.post("/login",userController.userLogin)
userRoute.post("/addtask",userController.addTask)

userRoute.get("/getalltask",userController.getAllTask)
userRoute.get("/edittask/:taskId",userController.editTask)
userRoute.put("/updatetask/:taskId",userController.updateTask)
userRoute.put("/softdelete/:taskId",userController.deleteTask)


module.exports= userRoute

