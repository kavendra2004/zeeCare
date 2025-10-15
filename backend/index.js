const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv"); // ✅ You forgot to require dotenv
const cloudinary = require("./config/cloudinary");
const messageRouter = require("./routes/messageRouter");
const userRouter = require("./routes/userRouter");
const appointmentRouter = require("./routes/appoitmentRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
const db = require("./config/database");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
const allowedOrigins = [
  "https://zee-care-mu.vercel.app",
  "https://zee-care-eklv.vercel.app",
  "https://zee-care-1yzp.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  }

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(cors({
  origin: allowedOrigins,
  methods: "GET,PUT,POST,DELETE",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies from the request headers
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.use(errorHandler); // Use the error handler middleware

console.log(
  "Cloudinary configured. Cloud name:",
  cloudinary.config().cloud_name
);

db.connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
