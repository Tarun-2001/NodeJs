const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position name"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "rejected", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
      required: [true, "Please provide user"],
    },
    jobType:{
      type:String,
      default:"Contract",
      trim:true,
      maxlength:50,
      minlength:3
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobModel", jobSchema);
