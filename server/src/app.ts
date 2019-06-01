import { json, urlencoded } from "body-parser";
import cors = require("cors");
import express = require("express");
import { sign } from "jsonwebtoken";
import mongoose = require("mongoose");
import winston = require("winston");

import { User } from "./models/User";
import { routes } from "./routes";
import { seedUsers } from "./seed";

mongoose.Promise = global.Promise;

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const { JWT_SECRET = "todo-app-super-shared-secret" } = process.env;
const logger = winston.createLogger({
  defaultMeta: { service: "user-service" },
  format: winston.format.json(),
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

// Configure middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Enable CORS
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configure routes
routes(router);
app.use("/", router);

app.post("/auth/login", async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (!user.comparePassword(password)) {
    return res.sendStatus(401);
  }
  const token = sign({ userID: user._id }, JWT_SECRET, { expiresIn: "2h" });
  res.send({ token });
});

mongoose.connect("mongodb://localhost:27017/lime", { useCreateIndex: true, useNewUrlParser: true }, () => {
  // Seed users on Connect
  seedUsers();
});

app.listen(PORT, () => logger.info(`Server running on localhost:${PORT}`));

export default app;
