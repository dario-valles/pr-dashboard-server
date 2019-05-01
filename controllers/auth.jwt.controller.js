const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

function generateAccessToken(userId, infinite = false) {
  const expiresIn = `1 ${infinite ? 'year' : 'month'}`;
  const issuer = keys.jsonWebTokenIssuer;
  const audience = keys.jsonWebTokenAudience;
  const secret = keys.jsonWebTokenSecret;
  const token = jwt.sign({}, secret, {
    expiresIn,
    audience,
    issuer,
    subject: userId.toString()
  });

  return token;
}

console.log('TOKEN', generateAccessToken('5cc3275306ceea6b73b37f95', true));

module.exports.generateUserToken = (req, res) => {
  const accessToken = generateAccessToken(req.user.id);
  res.setHeader('Authorization', accessToken);
  res.send({ token: accessToken });
};
