const jwt = require("jsonwebtoken");
const secret = process.env.secret;
//console.log(secret);

const withAuth = function (req, res, next) {
  //  console.log(res.cookies.token)
  const token =  req.header('Authorization');
  //req.body.token ||
  //||
  //req.cookies.token;

  //console.log(token);
  
  //console.log(req.cookies);
  if (!token) {
   // console.log("no token");
    res.status(401).send("Unauthorized: No token provided");
  } else {
   //console.log(token);
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
      //  console.log(err)
        res.send("Unauthorized: Invalid token" + err);
      } else {
        console.log("verified");
        next();
      }
    });
  }
};
module.exports = withAuth;

// //module.exports = withAuth;
