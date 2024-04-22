const { StatusCodes } = require("http-status-codes");
const JobModel = require("../models/jobModel");
const NotFound = require("../errors/NotFound");
const MetaError = require("../errors/MetaError");

const getAllJobs = async (req, res, next) => {
  try {
    const allJobs = await JobModel.find({ createdBy: req.user }).sort(
      "createdBy"
    );
    res
      .status(StatusCodes.OK)
      .json({
        Message: "Jobs fetched sucessfully",
        count: allJobs.length,
        allJobs,
      });
  } catch (error) {
    next(error);
  }
};

const getJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const myJob = await JobModel.findOne({ _id: id, createdBy: req.user });
    if (!myJob) throw new NotFound("No job is found with given id");
    res
      .status(StatusCodes.OK)
      .json({ Message: "Job fetched successfully", Job: myJob });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const obj = { ...req.body };
    obj.createdBy = req.user;
    const result = await JobModel.create(obj);
    res
      .status(StatusCodes.CREATED)
      .json({ Status: "Job created sucessfully", result });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateJob = await JobModel.findOneAndUpdate(
      { _id: id, createdBy: req.user },
      req.body,
      { new: true, runValidators: true }
    );
    if (req.body.company === "" || req.body.position === "")
      throw new MetaError.BadRequest(
        "Company and Position field can not be empty"
      );
    if (!updateJob) throw new MetaError.NotFound("Job not found with given id");
    res
      .status(StatusCodes.OK)
      .json({ Message: "Job updated sucessfully", updateJob });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteJob = await JobModel.findOneAndDelete({
      _id: id,
      createdBy: req.user,
    });
    if (!updateJob) throw new MetaError.NotFound("Job not found with given id");
    res
      .status(StatusCodes.OK)
      .json({ Message: "Job Deleted sucessfully", deleteJob });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
