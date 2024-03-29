const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  taskStatus: {
    type: String,
    required: true,
  },
  taskDueDate: {
    type: Date,
    required: true,
  },
  taskCreatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  taskVisible:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model("Task", taskSchema);
