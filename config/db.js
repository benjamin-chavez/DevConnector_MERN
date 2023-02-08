const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// mongoose.connect(db)
const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", false);

    await mongoose.connect(db, {
      useNewUrlParser: true,
      // useCreateIndex: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
