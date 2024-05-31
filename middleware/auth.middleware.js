const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.redirect('/'); // Redirect to login if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = await User.findByPk(decoded.id);
    
    if (user) {
      req.user = user; 
      next(); 
    } else {
      res.clearCookie('jwt');
      return res.redirect('/'); 
    }
  } catch (error) {
    res.clearCookie('jwt');
    return res.redirect('/');
  }
};

module.exports = authMiddleware;
