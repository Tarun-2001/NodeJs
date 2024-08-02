const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../errors/BadRequest");
const user = require("../models/userModel");
const Unauthenticated = require("../errors/Unaunthenticated");
const generateToke = require("../middleware/tokengeneration");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequest("Please provide password and email");
    const users = await user.findOne({ email });
    if (!users) throw new Unauthenticated("User not exist");
    const isPasswordCorrect = await users.comparePassword(password);
    if (!isPasswordCorrect) throw new Unauthenticated("Invalid Credentials");
    const token = users.createJWT();
    res.status(StatusCodes.OK).json({ users, token });
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const register = await user.create({ ...req.body });
    const token = register.createJWT();
    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
