require('dotenv').config();
const User = require('./usuario.model');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        const {
            _id,
            password: passUser,
            email,
            isActive,
            isAdmin
        } = await User.findOne({ username });

        const result = bcrypt.compareSync(password, passUser);
        if (result) {
            const token = JWT.sign({
                _id,
                username,
                email,
                isActive,
                isAdmin
            }, process.env.secret)
            res.json({ token })
        } else {
            res.status(401).json('no autorizado')
        }
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}


exports.create = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        const newUser = new User({
            username,
            email,
            password: bcrypt.hashSync(password, parseInt(process.env.crypt))
        });
        const createUser = await newUser.save();
        res.json(createUser);
    } catch (error) {
        console.log(error);
        res.status(404).json("Error");

    }
}



exports.addFollowers = async (req, res) => {
    try {
        //id mi usuario
        const _id = req.auth;
        //id usuario que voy a seguir
        const idUser = req.body;
        const myUser = await User.findById(_id)
        const userSeguir = await User.findById(idUser._id)

        if (myUser && userSeguir) {

            userSeguir.followers.push(_id);
            await userSeguir.save();

            myUser.following.push(idUser._id);
            await myUser.save();

            console.log(myUser.followers);
            res.status(200).json('Seguidor añadido')
        } else {
            console.log('error');
            res.status(400).json('error')
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteFollowing = async (req, res) => {
    try {
        const { _id } = req.auth;
        const idUser = req.body;
        const myUser = await User.findByIdAndUpdate(_id, { $pull: { "following": idUser._id } })
        const otherUser = await User.findByIdAndUpdate(idUser._id, { $pull: { "followers": _id } })
        if (myUser && otherUser) {
            console.log(myUser.following);
            console.log(otherUser.followers);
            res.status(200).json('Eliminado')
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteFollowers = async (req, res) => {
    try {
        const { _id } = req.auth;
        const idUser = req.body;
        const myUser = await User.findByIdAndUpdate(_id, { $pull: { "followers": idUser._id } })
        const otherUser = await User.findByIdAndUpdate(idUser._id, { $pull: { "following": _id } })
        if (myUser && otherUser) {
            console.log(myUser.followers);
            console.log(otherUser.following);
            res.status(200).json('Eliminado')
        }
    } catch (error) {
        console.log(error);
    }
}
