const jwt = require('jsonwebtoken');
const db = require('../models/index');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.redirect('/'); // Redirect to login if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Rijvan1116c');
    const user = await db.User.findByPk(decoded.id);
    const session_token = await db.Session.findOne({ where: { session_token : decoded.session_token } });
    
    if (user && session_token) {
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
