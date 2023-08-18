
const jwt = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = jwt.sign(
    { username: user.username},
    "jwtsecretplschange"
  );
  
  return accessToken;
};



const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.redirect("/");    
  try {
    const validToken = jwt.verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };