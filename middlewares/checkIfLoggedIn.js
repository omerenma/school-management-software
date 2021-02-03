const allowIfLoggedIn = async (req, res, next) => {
  try {
    // Hold the details of the logged in user
    const user = res.locals.loggedInUser;
    if (!user) {
      return res
        .status(401)
        .json({ error: "You need to be logged in to access this route" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = allowIfLoggedIn;
