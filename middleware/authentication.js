const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    const testUser = payload.userId === '67f52d7e644c889bf742b1ca';
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
