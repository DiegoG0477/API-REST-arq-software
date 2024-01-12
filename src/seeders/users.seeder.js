require("dotenv").config();
const db = require("../configs/db.config");
const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const bcryptSalt = parseInt(process.env.BCRYPT_SALT);

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("conectado a la base de datos");
        insertMany();
    }
});

const insertMany = async () => {
    User.truncateTable();

    await User.create({nombre: "nombre1", apellidoPat:"apellido_pat1", apellidoMat:"apellido_mat1", email: "email1@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre2", apellidoPat:"apellido_pat2", apellidoMat:"apellido_mat2", email: "email2@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre4", apellidoPat:"apellido_pat4", apellidoMat:"apellido_mat4", email: "email4@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre3", apellidoPat:"apellido_pat3", apellidoMat:"apellido_mat3", email: "email3@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre6", apellidoPat:"apellido_pat6", apellidoMat:"apellido_mat6", email: "email6@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre5", apellidoPat:"apellido_pat5", apellidoMat:"apellido_mat5", email: "email5@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre8", apellidoPat:"apellido_pat8", apellidoMat:"apellido_mat8", email: "email8@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre9", apellidoPat:"apellido_pat9", apellidoMat:"apellido_mat9", email: "email9@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre7", apellidoPat:"apellido_pat7", apellidoMat:"apellido_mat7", email: "email7@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});
    await User.create({nombre: "nombre10", apellidoPat:"apellido_pat10", apellidoMat:"apellido_mat10", email: "email10@gmail.com", password: bcrypt.hashSync('1234', bcryptSalt)});

    console.log("usuarios creados correctamente");
    db.end();
}