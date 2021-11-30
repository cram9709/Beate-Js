const PlayList = require('./model');
const Track = require('../tracks/model')

exports.get = async ({ params: input }, res) => {
    try {
        let buscar = input
        const result = await PlayList.find({ name: new RegExp(buscar.input, "i") })
        if (result) {
            console.log(result);
            res.status(200).json(result);
        } else {
            console.log("No encontrado");
            res.status(400).json('No se encuentra coincidencia')
        }
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.create = async (req, res) => {
    try {
        const _id = req.auth;
        const {name} = req.body;
        const newTrack = await PlayList.create({
            name,
            userCreate: _id
        });
        console.log(newTrack);
        res.status(200).json('La  PlayList ha sido agregada')
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.addTrack = async (req, res) => {
    try {
        const { _id } = req.params;
        const { idTrack } = req.body;
        const track = await Track.findById(idTrack);
        const playList = await PlayList.findByIdAndUpdate(_id, { $push: { "songs": idTrack } });
        if (playList && track){
            console.log(playList);
            res.status(200).json('Track añadido');
        }else{
            console.log('no existe la playlist');
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

exports.deleteTrack = async (req,res) => {
    try {
        try {
            const { _id } = req.params;
            const { idTrack } = req.body;
            const playList = await PlayList.findByIdAndUpdate(_id, { $pull: { "songs": idTrack } });
            if (playList){
                console.log(playList);
                res.status(200).json('Track eliminado');
            }else{
                console.log('no existe la playlist');
            }
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

exports.update = async ({ params: _id, body }, res) => {
    try {
        const result = await PlayList.findByIdAndUpdate(_id, body);
        console.log(result);
        if (result) {
            res.status(200).json(' PlayList actualizada')
        } else {
            res.status(400)
        }
    } catch (error) {
        console.log(error);
        res.status(400)

    }
}

exports.deleteOne = async ({ params: _id }, res) => {
    try {
        const result = await PlayList.findByIdAndDelete(_id);
        if (result) {
            console.log(result);
            res.status(200).json('PlayList eliminada');
        } else {
            res.status(400).json('No existe esta PlayList')
        }
    } catch (error) {
        console.log('Error');
        res.status(400).json('Error');
    }
}
