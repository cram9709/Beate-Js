const Track = require('./model');
const cloudinary = require("cloudinary");

const audioConfig = {
    resource_type: "video",
    chunk_size: 6000000,
    eager_async: true,
};

exports.get = async ({ params: input }, res) => {
    try {
        let buscar = input
        const result = await Track.find({ name: new RegExp(buscar.input, "i") })
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
        const newTrack = await Track.create(body);
        console.log(newTrack);
        res.status(200).json('La canción ha sido agregada')
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.uploadTrack = async (req, res) => {
    try {
        const {
            archivo,
            artisName,
            name,
            albumName
        } = req.body;

        const file = await cloudinary.v2.uploader.upload(
            "Parquecito.mp4",
            audioConfig
        );
        
        const newTrack = new Track({
            artisName,
            name,
            fileUrl: file.secure_url,
            albumName
        });
        const createTrack = await newTrack.save();
        res.json(createTrack);

    } catch (error) {
        console.log(error);
    }
}

exports.update = async ({ params: _id, body }, res) => {
    try {
        const result = await Track.findByIdAndUpdate(_id, body);
        console.log(result);
        if (result) {
            res.status(200).json('PlayList actualizada')
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
            res.status(400).json('No existe')
        }
    } catch (error) {
        console.log('error');
        res.status(400).json('Error');
    }
}







