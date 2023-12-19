const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
    try{
        // Read token of cookies
        const token = req.cookies.Authorization;
        // Decode the token
        const decoded = jwt.verify(token, process.env.SECRET);
        // Check expiration
        if(Date.now() > decoded.exp) return res.sendStatus(401);
        // Find user using decoded sub
        const user = await User.findById(decoded.sub);
        if(!user) return res.sendStatus(401);

        // attact user to req
        req.user = user;

        // continue on
        next();
    } catch(error) {
        return res.sendStatus(401);
    }
}

module.exports = requireAuth;