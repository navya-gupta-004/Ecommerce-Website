async function userLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Only send over HTTPS
      sameSite: "None", // Allow cross-origin requests
    });

    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;
