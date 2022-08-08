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

exports.updateUser = async (req, res) => {
    try {
        if (req.body.newUsername) {
            const user = await User.findOne({username: req.body.username})
            let oldUser = req.body.username
            let newUser = req.body.newUsername
            console.log(`Changing ${oldUser} to ${newUser}`)
            await User.updateOne({username: user.username}, {$set: {username: req.body.newUsername}});
            res.send({ msg: "Username Updated"})
        } else if (req.body.newEmail) {
            const user = await User.findOne({email: req.body.email})
            let oldEmail = req.body.email
            let newEmail = req.body.newEmail
            console.log(`Changing ${oldEmail} to ${newEmail}`)
            await User.updateOne({email: user.email}, {$set: {email: req.body.newEmail}});
            res.send({ msg: "E-Mail Updated"})
        } else {
            console.log("Error: update failed - else")
            es.send({ msg: "Update failed : Else"})
        }
    }
    catch (error) {
        console.log(error)
        res.send({ err: error })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        console.log("Deleting a user...");
        await User.deleteOne({ username: req.body.username })
        res.send({ msg: "This came from deleteUser" });
    }
    catch (error) {
        console.log(error);
        res.send({ err: error });
    }
};