const User = require("../models/user.model");
const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const offset = (page - 1) * limit;
        const users = await User.findAll(parseInt(limit), parseInt(offset));

        let response = {
            message: "se obtuvieron correctamente los usuarios",
            data: users,
        };

        if (page && limit) {
            const totalUsuarios = await User.count();
            const totalPages = Math.ceil(totalUsuarios / limit);

            response = {
                ...response,
                total: totalUsuarios,
                totalPages,
            };
        }

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({
            message: "error obteniendo los usuarios",
            error: err,
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "usuario no encontrado",
            });
        }
        return res.status(200).json({
            message: "usuario encontrado correctamente",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error obteniendo el usuario",
            error: error,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.logicDelete(id, req.usuario_id);

        return res.status(200).json({
            message: "usuario eliminado correctamente",
        });
    } catch (err) {
        return res.status(500).json({
            message: "error eliminando el usuario",
            error: err,
        });
    }
};

const physicDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.physicDelete(id);

        return res.status(200).json({
            message: "usuario eliminado correctamente",
        });
    } catch (err) {
        return res.status(500).json({
            message: "error eliminando el usuario",
            error: err,
        });
    }
};

const completeUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        const user = {
            ...req.body,
            password: await User.encryptPassword(req.body.password),
            updated_at: new Date(),
            updated_by: req.usuario_id,
        };

        await User.putUpdate(id, user);

        return res.status(200).json({
            message: "usuario actualizado correctamente",
        });
    } catch (err) {
        return res.status(500).json({
            message: "error actualizando el usuario",
            error: err,
        });
    }
};

const getTypeUser = async (req, res) => {
    try {
        const id = req.params.id;
        const typeUser = await User.getTypeUser(id);

        if (!typeUser) {
            return res.status(404).json({
                message: "usuario no encontrado",
            });
        }

        return res.status(200).json({
            message: "usuario encontrado correctamente",
            data: typeUser,
        });
    } catch (err) {
        return res.status(500).json({
            message: "error obteniendo el usuario",
            error: err,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.password)
            req.body.password = await User.encryptPassword(req.body.password);

        const user = {
            ...req.body,
            updated_at: new Date(),
            updated_by: req.usuario_id,
        };

        await User.update(id, user);

        return res.status(200).json({
            message: "usuario actualizado correctamente",
        });
    } catch (err) {
        return res.status(500).json({
            message: "error actualizando el usuario",
            error: err,
        });
    }
};
const getTokenId = async (req, res) => {
    try {
        const { id } = await User.verifyToken(req.cookies.token);
        const data = await User.findById(id);
        return res.status(200).json({
            message: "se obtuvo correctamente",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al obtener un usuario",
            error: error.message,
        });
    }
};

module.exports = {
    index,
    getById,
    deleteUser,
    updateUser,
    completeUpdate,
    getTokenId,
    getTypeUser,
};
