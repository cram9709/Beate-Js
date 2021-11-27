const Album = require('./model');
const Track = require('../tracks/model');

exports.getOne = async ({ params: name }, res) => {
    try {
        const result = await Album.findOne(name).populate('coverUrl');
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
        res.status(200).json('El album ha sido creado');
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
            res.status(200).json('Album actualizado')
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
        const { name, _id } = req.body
        const track = await Track.findOne(name);
        if(track){
            const album = await Album.findById(_id);
            album.coverUrl.push(track._id);
            await album.save()
            console.log(album.coverUrl);
            res.status(200).json('Hecho')
        }
    } catch (error) {
        console.log(error);
        res.status(400).json('error')
    }
}

exports.deleteOne = async ({ params: _id }, res) => {
    try {
        const result = await Album.findByIdAndDelete(_id);
        if (result) {
            console.log(result);
            res.status(200).json('Album borrado');
        } else {
            res.status(400).json('No existe este album')
        }
    } catch (error) {
        oconsole.log(error);
        res.status(400).json('Error');
    }
}




