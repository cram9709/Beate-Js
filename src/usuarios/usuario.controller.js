const User = require('./usuario.model');

exports.create = async (req, res) =>{
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email,
            password

        });
        await newUser.save();
        res.json('Nuevo Usuario registrado correctamente');
    } catch (error) {
        console.log(error);
        res.status(404).json("Error");
        
    }
}



