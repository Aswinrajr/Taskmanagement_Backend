const Task = require("../Model/taskModel");
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

    res.status(200).json({ message: "User login successful" ,user:user});
  } catch (err) {
    console.log("Error on user login", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addTask = async (req, res) => {
  try {
    console.log("Welcome to add task", req.body);

    const { taskName, dueDate, description, status } = req.body;

    if (!taskName || !dueDate || !description || !status) {
      return res.status(400).json({ message: "All task fields are required" });
    }

    const newTask = new Task({
      taskName,
      taskDueDate: dueDate,
      taskDescription: description,
      taskStatus: status,
      taskCreatedAt: new Date().toISOString(),
    });

    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    console.log("Error in adding task", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTask = async (req, res) => {
  try {
    console.log("Welcome to get all tasks");

    const tasks = await Task.find({ taskVisible: true });
    console.log(tasks);

    res.status(200).json({ tasks });
  } catch (err) {
    console.log("Error in getting tasks", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    console.log("Welcome to edit task", taskId);

    const taskData = await Task.findOne({ _id: taskId });

    if (!taskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task: taskData });
  } catch (err) {
    console.log("Error in edit task", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { taskName, dueDate, description, status } = req.body;
    console.log(taskId, taskName, dueDate, description, status);

    if (!taskId) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const existingTask = await Task.findById({ _id: taskId });
    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    existingTask.taskName = taskName;
    existingTask.taskDueDate = dueDate;
    existingTask.taskDescription = description;
    existingTask.taskStatus = status;

    const updatedTask = await existingTask.save();

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    console.log("Welcome to soft delete task", taskId);

    const result = await Task.updateOne(
      { _id: taskId },
      { $set: { taskVisible: false } }
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Task not found or already deleted" });
    }

    res.status(200).json({ message: "Task soft deleted successfully" });
  } catch (err) {
    console.log("Error in soft delete", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  addTask,
  getAllTask,
  editTask,
  updateTask,
  deleteTask,
};
