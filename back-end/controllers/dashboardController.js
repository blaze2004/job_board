const User = require("../models/User");

const dashboardController = async (req, res) => {
  console.log(req.user);
  try {
    const foundUser = await User.findById(req.user.userId);
    console.log("User found:", foundUser); // Log the user data from the database
    console.log(__dirname);
    if (foundUser.role === "candidate") {
      return res.render("candidate", { foundUser });
    } else if (foundUser.role === "employer") {
      return res.render("employer", { foundUser });
    } else {
      return res.redirect("/home");
    }
  } catch (error) {
    console.error("Error in dashboard controller: ", error.message);
  }
};

module.exports = dashboardController;
