const Album = require('./model');

exports.getOne = async ({ params: name }, res) => {
    try {
        const result = await Album.findOne(name).populate('artistName');
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

exports.create = async({ body }, res) => {
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




