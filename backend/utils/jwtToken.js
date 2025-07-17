export const generateJwtToken = (user, message, statusCode, res) => {
  const token = user.getJWTToken();
  const cookieName = user.role === "admin" ? "adminToken" : "patientToken";

  // ✅ Set CORS headers manually
  res.setHeader("Access-Control-Allow-Origin", res.req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const options = {
    httpOnly: true,                      // 🔐 Recommended for auth cookies
    sameSite: "Lax",                     // ✅ Good default for local dev
    secure: false,                       // ✅ Set to true only in production over HTTPS
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
  };

  res
    .status(statusCode)
    .cookie(cookieName, token, options)
    .json({
      success: true,
      message,
      user,
      token,
    });
};
