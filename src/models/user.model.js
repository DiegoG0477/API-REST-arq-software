require("dotenv").config();
const db = require("../configs/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class User {
    constructor({ id,email, password, nombre, apellidoPat, apellidoMat, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, tipoUsuario }){
        this.id = id;
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellidoPat = apellidoPat;
        this.apellidoMat = apellidoMat;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
        this.deleted = deleted;
        this.deletedAt = deletedAt;
        this.deletedBy = deletedBy;
        this.tipoUsuario = tipoUsuario;
    }

    static async findAll(){
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT * FROM usuarios u INNER JOIN datos_usuarios du ON u.id_usuario = du.id_usuario WHERE deleted = 0");
        connection.end();
        return rows;
    }

    static async findById(id){
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT * FROM usuarios u INNER JOIN datos_usuarios du ON u.id_usuario = du.id_usuario WHERE u.id_usuario = ?", [id]);
        connection.end();

        if(rows.length > 0){
            const row = rows[0];
            return new User({ id: row.id_usuario, email: row.email, password: row.password, nombre: row.nombre, apellidoPat: row.apellido_pat, apellidoMat: row.apellido_mat, createdAt: row.created_at, updatedAt: row.updated_at, updatedBy: row.updated_by, deleted: row.deleted, deletedAt: row.deleted_at, deletedBy: row.deleted_by, tipoUsuario: row.tipo_usuario });
        }

        return null;
    }

    static async findByEmail(email){
        const connection = await db.createConnection();
        const sql = "SELECT * FROM usuarios WHERE email = ?";
        const [rows] = await connection.execute(sql,[email]);
        connection.end();

        if(rows.length > 0){
            const row = rows[0];
            return new User({ id: row.id_usuario, email: row.email, password: row.password, nombre: row.nombre, apellidoPat: row.apellido_pat, apellidoMat: row.apellido_mat, createdAt: row.created_at, updatedAt: row.updated_at, updatedBy: row.updated_by, deleted: row.deleted, deletedAt: row.deleted_at, deletedBy: row.deleted_by, tipoUsuario: row.tipo_usuario });
        }

        return null;
    }

    static async getId(email){
        const connection = await db.createConnection();
        const sql = "SELECT id_usuario FROM usuarios WHERE email = ?";
        const [result] = await connection.execute(sql,[email]);
        connection.end();

        console.log(result);

        if(result.length > 0){
            const row = result[0];
            return row.id_usuario;
        }

        return null;
    }

    static async count(){
        const connection = await db.createConnection();
        const sql = "SELECT COUNT(*) AS total_users FROM usuarios WHERE deleted = 0";
        const [result] = await connection.execute(sql);
        connection.end();

        if(result.length > 0){
            const row = result[0];
            return row.total_users;
        }

        return null;
    }

    async create(){
        const connection = await db.createConnection();
        const [result] = await connection.execute("INSERT INTO usuarios(email, password, created_at) VALUES (?,?,?)", [this.email, this.password, new Date()]);
        
        console.log(result);
        const id = await User.getId(this.email);
        console.log(id);     

        const [resultTwo] = await connection.execute("INSERT INTO datos_usuarios(id_usuario, nombre, apellido_pat, apellido_mat) VALUES (?,?,?,?)", [id, this.nombre, this.apellidoPat, this.apellidoMat]);
        connection.end();

        console.log(resultTwo);
        if(result.insertId === 0 || resultTwo.affectedRows === 0){
            throw new Error("No se insertó el usuario de forma correcta");
        }

        return;
    }

    static async logicDelete(userId, adminId){
        const connection = await db.createConnection();
        const [result] = await connection.execute("UPDATE usuarios SET deleted = 1, deleted_by = ?, deleted_At = ? WHERE id_usuario = ?",[adminId, new Date(), userId]);
        connection.end();

        console.log(result);
        if(result.affectedRows === 0){
            throw new Error("No se eliminó el usuario");
        }
        return;
    }

    static async physicDelete(userId){
        const connection = await db.createConnection();
        const [result] = connection.execute("DELETE FROM usuarios WHERE id_usuario = ?",[userId]);
        connection.end();

        if(result.affectedRows === 0){
            throw new Error("No se eliminó el usuario");
        } 
        return;
    }

    static async update(userId, user){
        connection = await db.createConnection();
        const sql = "UPDATE usuarios SET ? WHERE id_usuario = ?";
        const [result] = connection.execute(sql,[user, userId]);

        const sqlTwo = "UPDATE datos_usuarios SET ? WHERE id_usuario = ?";
        const [resultTwo] = connection.execute(sqlTwo,[user, userId]);
        connection.end();

        if(result.affectedRows === 0 || resultTwo.affectedRows === 0){
            throw new Error("No se actualizó el usuario");
        }
        return;
    }

    static async getTypeUser(userId){
        const connection = await db.createConnection();
        const [result] = await connection.execute("SELECT tipo_usuario FROM usuarios WHERE id_usuario = ?",[userId]);
        connection.end();

        if(result.length > 0){
            const row = result[0];
            if(row.tipo_usuario === 1){
                return "Administrador";
            }else if(row.tipo_usuario === 2){
                return "Cliente";
            }
        }

        return null;
    }

    static async truncateTable(){
        const connection = await db.createConnection();
        [result] = await connection.execute("DELETE FROM usuarios WHERE id_usuario > 0");

        if(result.affectedRows === 0){
            throw new Error("No se eliminaron los usuarios");
        }
        return;
    }

    static async encryptPassword(password){
        const salt = bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
        const bcryptSalt = parseInt(process.env.BCRYPT_SALT)
        
        return bcrypt.hashSync(password,bcryptSalt);
    }

    static async comparePassword(password, receivedPassword){
        return await bcrypt.compare(receivedPassword, password);
    }

    static getToken(id){
        return jwt.sign({id:id},process.env.SECRET_KEY,{expiresIn: '12h'})
    }

    static async verifyToken(token){
        return jwt.verify(token, process.env.SECRET_KEY);
    }
}
module.exports=User;