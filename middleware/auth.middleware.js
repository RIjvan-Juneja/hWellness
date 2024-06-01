const jwt = require('jsonwebtoken');
const db = require('../models/index');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.redirect('/login'); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Rijvan1116c');
    const user = await db.User.findByPk(decoded.id);
    const session_token = await db.Session.findOne({ where: { session_token : decoded.session_token } });
    if (user && session_token) {
      req.user = { id: decoded.id, session_token : decoded.session_token };
      next(); 
    } else {
      res.clearCookie('jwt');
      return res.redirect('/login'); 
    }
  } catch (error) {
    res.clearCookie('jwt');
    return res.redirect('/login');
  }
};

module.exports = authMiddleware;
