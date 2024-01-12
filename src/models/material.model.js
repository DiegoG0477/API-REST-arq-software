const db = require("../configs/db.config");

class Material {
    constructor({titulo, uploadedAt, uploadedBy, updatedAt, updatedBy, precio, editorial, autor, anioMaterial, numeroPaginas, descripcion, portadaLibroUrl, pdfUrl}) {
        this.titulo = titulo;
        this.uploadedAt = uploadedAt;
        this.uploadedBy = uploadedBy;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
        this.precio = precio;
        this.editorial = editorial;
        this.autor = autor;
        this.anioMaterial = anioMaterial;
        this.numeroPaginas = numeroPaginas;
        this.descripcion = descripcion;
        this.portadaLibroUrl = portadaLibroUrl;
        this.pdfUrl = pdfUrl;
    }

    static async getAll(limit, offset) {
        const connection = await db.createConnection();
        let query = "SELECT * FROM material";

        if (offset >= 0 && limit) {
            query += ` LIMIT ${offset}, ${limit}`;
        }

        const [rows] = await connection.execute(query);
        connection.end();
        return rows;
    }
    

    static async getById(id) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT * FROM material WHERE id_material = ?", [id]);
        connection.end();
    
        if(rows.length > 0){
            const row = rows[0];
            return new Material({titulo: row.titulo, uploadedBy: row.uploaded_by, precio: row.precio, editorial: row.editorial, autor: row.autor, anioMaterial: row.year_material, numeroPaginas: row.numero_paginas, descripcion: row.descripcion, portadaLibroUrl: row.portada_libro, pdfUrl: row.pdf, uploadedAt: row.uploaded_at, updatedAt: row.updated_at, updatedBy: row.updated_by});
        }

        return null;
    }

    async save() {
        console.log(this);
        const connection = await db.createConnection();
        const sql = "INSERT INTO material(titulo, uploaded_at, uploaded_by, precio, editorial, autor, year_material, numero_paginas, descripcion, portada_libro, pdf) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        const [result] = await connection.execute(sql, [this.titulo, this.uploadedAt, this.uploadedBy, this.precio, this.editorial, this.autor, this.anioMaterial, this.numeroPaginas, this.descripcion, this.portadaLibroUrl, this.pdfUrl]);
        connection.end();

        console.log(result);
        if (result.insertId === 0) {
            throw new Error("No se insertó el usuario");
        }

        this.id = result.insertId;
        this.updatedAt = null;
        this.updatedBy = null;
        return;
    }

    static async updateById(material, id){
        const connection = await db.createConnection();
        console.log("id de material " + id)
        const sql = "UPDATE material SET ? WHERE id_material = ?";
        const [result] = await connection.query(sql, [material, id]);
        connection.end();
        if (result.affectedRows === 0) {
            throw new Error("no se actualizó el usuario");
        }
        return;
    }

    static async count(){
        const connection = await db.createConnection();
        const sql = "SELECT COUNT(*) AS total FROM material";
        const [rows] = await connection.execute(sql);
        connection.end();
        
        console.log(rows);
        return rows[0].total;
    }

    static async truncateTable(){
        const connection = await db.createConnection();
        const sql = "DELETE FROM material";
        const [result] = connection.execute(sql);
        connection.end();

        console.log(result);
        if (result.affectedRows === 0) {
            throw new Error("no se truncó la tabla");
        }
        return;
    }
}
module.exports=Material;