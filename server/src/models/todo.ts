import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      require: true,
    },
    isDone: {
      type: Boolean,
      require: true,
    },
  },
  {
    toObject: {
      virtuals: true,
      alias: "id",
    },
    toJSON: {
      virtuals: true,
      alias: "id",
    },
  }
);

export default mongoose.model("todos", todoSchema);
