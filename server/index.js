// const express = require("express");

// const app = express();

// const userRoutes = require("./routes/User");
// const paymentRoutes = require("./routes/Payments");
// const profileRoutes = require("./routes/Profile");
// const CourseRoutes = require("./routes/Course");

// const database = require("./config/database");
// const cookieParser = require("cookie-parser");

// const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const { cloudnairyconnect } = require("./config/cloudinary");

// const dotenv = require("dotenv");
// dotenv.config();

// const PORT = process.env.PORT || 5000;
// database.connect();

// app.use(express.json());
// app.use(cookieParser());

// const whitelist = process.env.CORS_ORIGIN
//   ? JSON.parse(process.env.CORS_ORIGIN)
//   : ["*"];

// app.use(
//   cors({
//     origin: whitelist,
//     credentials: true,
//     maxAge: 14400,
//   })
// );

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );

// cloudnairyconnect();

// app.use("/api/v1/auth", userRoutes);

// app.use("/api/v1/payment", paymentRoutes);

// app.use("/api/v1/profile", profileRoutes);

// app.use("/api/v1/course", CourseRoutes);

// app.use("/api/v1/contact", require("./routes/ContactUs"));

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the API",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");

const app = express();

const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const CourseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudnairyconnect } = require("./config/cloudinary");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
database.connect();

app.use(express.json());
app.use(cookieParser());

// Set up CORS whitelist
let whitelist;
try {
  whitelist = process.env.CORS_ORIGIN ? JSON.parse(process.env.CORS_ORIGIN) : ["*"];
} catch (error) {
  console.error("CORS_ORIGIN is not valid JSON. Using it as a string.");
  whitelist = process.env.CORS_ORIGIN || ["*"];
}

app.use(
  cors({
    origin: Array.isArray(whitelist) ? whitelist : [whitelist], // Handle both array and single string
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudnairyconnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/contact", require("./routes/ContactUs"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
