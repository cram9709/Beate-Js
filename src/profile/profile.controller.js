const Profile = require('./profile.model');


exports.getOne = async ({ params: { _id } }, res) => {
    try {
        const result = await Profile.findById(_id).populate('user');
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

exports.getAll = async (req, res) => {
    try {
        const result = await Profile.find().populate('user');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json('Error')
    }
}

exports.create = async (req, res) => {
    try {
        const { photo,
            firstName,
            lastName,
            isArtist,
            artistName,
            user } = req.body;
        const newProfile = new Profile({
            photo,
            firstName,
            lastName,
            isArtist,
            artistName,
            user
        });
        await newProfile.save();
        res.json('Perfil Completo');
    } catch (error) {
        console.log(error);
        res.status(404).json("Error");

    }
}

exports.update = async ({ params: { _id }, body }, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(_id, body);
        console.log(profile);
        if(profile){
            console.log(profile);
            res.status(200).json('Perfil actualizado');
        }else {
            res.status(400).json('Ocurrio un error')
        }
    } catch (error) {
        res.status(200).json('Error')
        console.log(error);
    }
}



