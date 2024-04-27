const { StatusCodes } = require("http-status-codes");
const JobModel = require("../models/jobModel");
const NotFound = require("../errors/NotFound");
const MetaError = require("../errors/MetaError");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllJobs = asyncWrapper(async (req, res) => {
  const searchObject = {
    createdBy: req.user,
  };
  if (req.query.search)
    searchObject.position = { $regex: req.query.search, $options: "i" };
  if (req.query.status && req.query.status !== "all")
    searchObject.status = req.query.status;
  if (req.query.jobType) searchObject.jobType = req.query.jobType;

  const result = await JobModel.find(searchObject);
  const totalJobs = result.length
  if (req.query.sort === "latest") result = result.sort("-createdAt");
  if (req.query.sort === "oldest") result = result.sort("createdAt");
  if (req.query.sort === "a-z") result = result.sort("position");
  if (req.query.sort === "z-a") result = result.sort("-position");



  const { page, limit, skip } = req.query;
  const flag = false;
  if (page && limit) flag = true;

  if (page) page = page || 1;
  if (limit) limit = limit || 10;
  if (flag) {
    skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
  }
  
  const allJobs = result;
  res.status(StatusCodes.OK).json({
    Message: "Jobs fetched sucessfully",
    count: totalJobs,
    allJobs,
  });
});

const getJob = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const myJob = await JobModel.findOne({ _id: id, createdBy: req.user });
  if (!myJob) throw new NotFound("No job is found with given id");
  res
    .status(StatusCodes.OK)
    .json({ Message: "Job fetched successfully", Job: myJob });
});

const createJob = asyncWrapper(async (req, res) => {
  const obj = { ...req.body }; // spread operation - Hallow copy 
  obj.createdBy = req.user;
  const result = await JobModel.create(obj);
  res
    .status(StatusCodes.CREATED)
    .json({ Status: "Job created sucessfully", result });
});

const updateJob = asyncWrapper(async (req, res) => {
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
