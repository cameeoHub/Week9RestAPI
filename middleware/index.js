const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8);
        next();
    } catch (error) {
        console.log(error);
        res.send({ err: error });
    }
};

exports.comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({username: req.body.username});
        if (
            req.user &&
            (await bycrypt.compare(req.body.password, req.user.password))
        ) {
            next();
        } else {
            throw new Error({ msg: "Incorrect credentials"});
        }
    } catch (error) {
        console.log(error);
        res.send({ err: error });
    }
};

exports.tokenCheck = async (req, res, next) => {
    try {
        console.log("this is tokenCheck");
        const token = req.header("Authorization");
        const decodedToken = await jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decodedToken._id);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(418).send({ err: error });
    }
};