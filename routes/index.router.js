const express = require("express");
const userRoutes = require("./render.router");
const authRoutes = require("./auth.router");
const panelRoutes = require("./panel.router");

const router = express.Router();

router.use('/', userRoutes);
router.use('/', authRoutes);
router.use('/', panelRoutes)

module.exports = router;

