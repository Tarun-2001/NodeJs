const { StatusCodes } = require("http-status-codes");
const JobModel = require("../models/jobModel");
const NotFound = require("../errors/NotFound");
const MetaError = require("../errors/MetaError");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllJobs = asyncWrapper(async (req, res, next) => {
  const allJobs = await JobModel.find({ createdBy: req.user }).sort(
    "createdBy"
  );
  res.status(StatusCodes.OK).json({
    Message: "Jobs fetched sucessfully",
    count: allJobs.length,
    allJobs,
  });
});

const getJob = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const myJob = await JobModel.findOne({ _id: id, createdBy: req.user });
  if (!myJob) throw new NotFound("No job is found with given id");
  res
    .status(StatusCodes.OK)
    .json({ Message: "Job fetched successfully", Job: myJob });
});

const createJob = asyncWrapper(async (req, res, next) => {
  const obj = { ...req.body };
  obj.createdBy = req.user;
  const result = await JobModel.create(obj);
  res
    .status(StatusCodes.CREATED)
    .json({ Status: "Job created sucessfully", result });
});

const updateJob = asyncWrapper(async (req, res, next) => {
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
});

const deleteJob = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const deleteJob = await JobModel.findOneAndDelete({
    _id: id,
    createdBy: req.user,
  });
  if (!updateJob) throw new MetaError.NotFound("Job not found with given id");
  res
    .status(StatusCodes.OK)
    .json({ Message: "Job Deleted sucessfully", deleteJob });
});

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
