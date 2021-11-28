require('dotenv').config();
const User = require('./model');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const cloudinary = require("cloudinary");


exports.getUsername = async ({ params: { input } }, res) => {
    try {
        const result = await User.find({ username: new RegExp(input, "i") });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'No existe este usuario' });
        }
    } catch (error) {
        console.log(error);
        res.json('Error')
    }
}

exports.getName = async ({ params: { input } }, res) => {
    try {
        const result = await User.find({ firstName: new RegExp(input, "i") });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ message: 'No existe este usuario' });
        }
    } catch (error) {
        console.log(error);
        res.json('Error')
    }
}

exports.login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        const {
            _id,
            password: passUser,
            isAdmin
        } = await User.findOne({ username });

        const result = bcrypt.compareSync(password, passUser);
        if (result) {
            const token = JWT.sign({
                _id,
                username,
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
            password,
            firstName,
            lastName,
            photo
        } = req.body;
        const newUser = new User({
            username,
            email,
            password: bcrypt.hashSync(password, parseInt(process.env.crypt)),
            firstName,
            lastName,
            photo
        });
        const { _id, isAdmin } = await newUser.save();


        //Generar token de acceso

        const token = JWT.sign({
            _id,
            username,
            isAdmin
        }, process.env.secret)

        res.json('Usuario registrado este es su token: ' + token)

    } catch (error) {
        console.log(error);
        res.status(404).json("Error");

    }
}

exports.uploadPhoto= async(req, res) => {

    
}

exports.update = async (req, res) => {
    try {
        const { _id } = req.auth;
        const { firstName, lastName } = req.body
        const user = await User.findByIdAndUpdate(_id, {firstName, lastName});
        console.log(user);
        res.status(200).json('Actualizado')
    } catch (error) {
        console.log(error);
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
