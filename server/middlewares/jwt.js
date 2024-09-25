const jwt = require('jsonwebtoken');

const generateAccessToken = (uid, role) => jwt.sign({_id: uid, role}, process.env.JWT_SECRET, {expiresIn: "1h"});
const generateRefreshToken = (uid) => jwt.sign({_id: uid}, process.env.JWT_SECRET, {expiresIn: "1y"});

module.exports = {generateAccessToken, generateRefreshToken}