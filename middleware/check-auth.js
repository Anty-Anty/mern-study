//lect 182

const jwt = require('jsonwebtoken');

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {

    //lect 183
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; //Authorization: "Bearer TOKEN"
        if (!token) {
            throw new Error('Authentication failed!')
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError('Authorization failed!', 403);
        return next(error);
    }

};