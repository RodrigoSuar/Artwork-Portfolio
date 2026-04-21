const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const Admin = require("../models/admin");
const config = require("../utils/config");

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    const passwordCorrect =
        admin === null
            ? false
            : await bcrypt.compare(password, admin.passwordHash);

    if (!(admin && passwordCorrect)) {
        return res.status(401).json({
            error: "invalid username or password",
        });
    }

    const adminForToken = {
        username: admin.username,
        id: admin._id,
    };

    const token = jwt.sign(adminForToken, config.SECRET, {
         expiresIn: 60 * 60 * 24, // 24 hours
        
    });

    res.status(200).json({
        token,
        username: admin.username,
    });
});

module.exports = loginRouter;