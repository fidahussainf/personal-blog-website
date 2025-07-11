import express from "express";
import cors from "cors";
import mongodbConnection from "./config/mongodb.config.js";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
mongodbConnection();

// Routes
app.use("/", routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Internal Server Error",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
