const asyncWrapper = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch((error) => {
      next(error);
    });
  };
};

module.exports = asyncWrapper;
