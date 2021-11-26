const Post = require('./model');

exports.getAll = async (req, res) => {
    try {
        const result = await Post.find();
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

exports.getPostUser = async ({params: userName}, res) =>{
    try {
        const result = await Post.find(userName);
        if (result) {
            console.log(result);
            res.status(200).json(result);
        } else {
            console.log("No encontrado");
            res.status(400).json('No tienes post')
        }
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.create = async ({ body }, res) => {
    try {
        const newTrack = await Post.create(body);
        console.log(newTrack);
        res.status(200).json('Se ha realizado un post')
    } catch (error) {
        console.log(error);
        res.status(400)
    }
}

exports.update = async ({ params: _id, body }, res) => {
    try {
        const result = await Post.findByIdAndUpdate(_id, body);
        console.log(result);
        if (result) {
            res.status(200).json('Post actualizada')
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
        const result = await Post.findByIdAndDelete(_id);
        if (result) {
            console.log(result);
            res.status(200).json('Post eliminada');
        } else {
            res.status(400).json('No existe')
        }
    } catch (error) {
        console.log('error');
        res.status(400).json('Error');
    }
}
