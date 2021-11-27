const PlayList = require('./model');

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

exports.create = async ({ body }, res) => {
    try {
        const newTrack = await  PlayList.create(body);
        console.log(newTrack);
        res.status(200).json('La  PlayList ha sido agregada')
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.update = async ({ params: _id, body }, res) => {
    try {
        const result = await  PlayList.findByIdAndUpdate(_id, body);
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
        const result = await  PlayList.findByIdAndDelete(_id);
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
