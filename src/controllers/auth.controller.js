const User = require("../models/user.model");
const cookie = require("cookie");

const signUp = async (req, res) => {
    try {
        const encryptedPassword = await User.encryptPassword(req.body.password);

        const user = new User({
            email: req.body.email,
            password: encryptedPassword,
            nombre: req.body.nombre,
            apellidoPat: req.body.apellidoPat,
            apellidoMat: req.body.apellidoMat,
            tipoUsuario: 2,
        });

        const found = await User.findByEmail(user.email);
        if (found) {
            return res.status(400).json({
                message: "el usuario ya esta existe",
            });
        } else {
            user.create();

            return res.status(201).json({
                message: "usuario creado correctamente"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "error al crear el usuario",
            error: error,
        });
    }
};

const login = async (req, res) => {
    const userFound = await User.findByEmail(req.params.email);
    console.log(userFound);

    const matchPassword = await User.comparePassword(
        userFound.password,
        req.params.password
    );

    if (!userFound) {
        return res.status(200).json({
            message: "email o contraseña incorrecta",
        });
    } else if (!matchPassword) {
        return res.status(200).json({
            message: "email o contraseña incorrecta",
        });
    } else {
        const token = User.getToken(userFound.id);

        let hashedType = "";
        if(userFound.tipoUsuario == 1){
            hashedType = "Administrador";
        } else if(userFound.tipoUsuario == 2){
            hashedType = "Cliente";
        }

        const serializedToken = cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 1,
            path: "/",
        });

        const serializedType = cookie.serialize("typeUser", hashedType, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 1,
            path: "/",
        });

        res.setHeader("Set-Cookie", [serializedToken, serializedType]);

        return res.status(200).json({
            message: "inicio de sesion correcto",
            token: token,
        });
    }
};

const logout = async (req, res) => {
    try{
        res.setHeader("Set-Cookie", [
            cookie.serialize("token", undefined, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                expires: new Date(0),
                path: "/",
            }),
            cookie.serialize("typeUser", undefined, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                expires: new Date(0),
                path: "/",
            }),
        ]);
    
        return res.status(200).json({
            message: "sesion cerrada correctamente",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "error al cerrar la sesion",
            error: error,
        });
    }
}

module.exports = {
    signUp,
    login,
    logout
};
