const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../errors/BadRequest");
const user = require("../models/userModel");
const Unauthenticated = require("../errors/Unaunthenticated");
const generateToke = require("../middleware/tokengeneration");
const userModel = require("../models/userModel");
const { STATES } = require("mongoose");
const asyncWrapper = require("../middleware/asyncWrapper");
const MetaError = require('../errors/MetaError')

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequest("Please provide password and email");
  const users = await user.findOne({ email });
  if (!users) throw new Unauthenticated("User not exist");
  const isPasswordCorrect = await users.comparePassword(password);
  if (!isPasswordCorrect) throw new Unauthenticated("Invalid Credentials");
  const token = users.createJWT();
  res.status(StatusCodes.OK).json({ users, token });
});
const register = asyncWrapper(async (req, res, next) => {
  const {email} = req.body
  let checkUser = user.findOne({email})
  if(!checkUser) throw new MetaError.BadRequest('User already exist')
  const register = await user.create({ ...req.body });
  const token = register.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const { name, email, location, lastName } = req.body;
  if (!name || !email || !location || !lastName)
    throw new BadRequest("Enter all details ");
  const existingUser = await user.findOne({ _id: req.user });
  existingUser.email = email;
  existingUser.location = location;
  existingUser.name = name;
  existingUser.lastName = lastName;

  const result = await existingUser.save();
  if (!result)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: "Failed to update details please try again!!" });
  res.status(StatusCodes.OK).json({ Message: "Details updated sucessfully" });
});
module.exports = { login, register, updateUser };
