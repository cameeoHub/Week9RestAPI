const jwt = require("jsonwebtoken");
const User = require("./model");

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
        res.send({ msg: "This came from createUser", token });
    } catch (error) {
        console.log(error);
        res.send({ err: error });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET);
        res.send({user: req.user.username, token});
    } catch (error) {
        console.log(error);
        res.send({ err: error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        const result = users.map((u) => {
            return u.username;
        });
    } catch (error) {
        console.log(error);
        res.send({ err: error });
    }
};