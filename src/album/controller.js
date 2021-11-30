const Album = require('./model');
const Track = require('../tracks/model');

exports.getOne = async ({ params: input }, res) => {
    try {
        const result = await Album.find({ search: new RegExp(input.name, "i") }).populate('coverUrl');
        console.log(input)
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

exports.create = async ({ body }, res) => {
    try {
        const newAlbum = await Album.create(body);
        console.log(newAlbum);
        res.status(200).json('El álbum ha sido creado');
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.update = async ({ params: _id, body }, res) => {
    try {
        const result = await Album.findByIdAndUpdate(_id, body);
        console.log(result);
        if (result) {
            res.status(200).json('Álbum actualizado')
        } else {
            res.status(400)
        }
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
        const playList = await Album.findByIdAndUpdate(_id, { $push: { "coverUrl": idTrack } });
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
            const playList = await Album.findByIdAndUpdate(_id, { $pull: { "coverUrl": idTrack } });
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

exports.deleteOne = async ({ params: _id }, res) => {
    try {
        const result = await Album.findByIdAndDelete(_id);
        if (result) {
            console.log(result);
            res.status(200).json('Álbum borrado');
        } else {
            res.status(400).json('No existe este álbum')
        }
    } catch (error) {
        oconsole.log(error);
        res.status(400).json('Error');
    }
}




