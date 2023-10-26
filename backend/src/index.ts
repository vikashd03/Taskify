import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import taskifyRouter from "./routes/taskify";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const dbUrl: string = process.env.DATABASE_URL || "mongodb://localhost/taskify";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

app.use("/taskify/", taskifyRouter);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
} as ConnectOptions);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB Database"));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
