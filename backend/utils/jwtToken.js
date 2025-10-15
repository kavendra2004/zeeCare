export const generateJwtToken = (user, message, statusCode, res) => {
  const token = user.getJWTToken();
  const cookieName = user.role === "admin" ? "adminToken" : "patientToken";

  // ✅ Set CORS headers manually
  res.setHeader("Access-Control-Allow-Origin", res.req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const options = {
    httpOnly: true,
    sameSite: "None",     // ✅ Required for cross-site cookies (Vercel → Render)
    secure: true,                   // ✅ Set to true only in production over HTTPS
    path: "/", 
    maxAge: 24 * 60 * 60 * 1000  // optional (1 day)
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
