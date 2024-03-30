// const mongoose = require("mongoose");
// require("dotenv").config();

// const dbConnect = (req, res) => {
//   mongoose
//     .connect(`${process.env.DATABASE_CONNECTION}`)
//     .then(() => {
//       console.log("Connected to database");
//     })
//     .catch((err) => {
//       console.log("Error in conncting the datbase", err);
//     });
// };

// module.exports = dbConnect;

const mongoose = require("mongoose");

const dbConnect = (req, res) => {
  mongoose
    .connect(
      "mongodb+srv://aswinrajr07:yPXdXgF4ThtnerDz@cluster0.xf8fs26.mongodb.net/TaskManagementWebsite",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("connected to the database atlas");
      // console.log("connected to the database");
    })
    .catch((err) => {
      console.error("Error in connecting the database", err);
    });
};

module.exports = dbConnect;
