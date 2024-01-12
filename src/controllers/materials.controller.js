require("dotenv").config();
const Material = require("../models/material.model");
const fs = require("fs-extra")
const { uploadImage, uploadPdf } = require("../configs/cloudinary.config");
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;

        const data = await Material.getAll(limit, offset);

        let response = {
            menssage: "se obtuvieron los datos correctamente",
            data: data,
        }

        if (page && limit) {
            const totalBlogs = await Material.count();
            response = {
                ...response,
                total: totalBlogs,
                totalPages: Math.ceil(totalBlogs / limit),
                currentPage: page
            };
        }
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            message: "error al obtener los materiales",
            error: error,
        });
    }
};

const showMaterial = async (req, res) => {
    try {
        const material = await Material.getById(req.params.id);

        return res.status(200).json({
            message: "material encontrado",
            data:material,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al obtener el material",
            error: error,
        });
    }
};

const uploadMaterial = async (req, res) => {
    try {
        const token = jwt.verify(req.cookies.token, process.env.SECRET_KEY);

        let portada = null
        if(req.files?.portada){
            portada = await uploadImage(req.files.portada.tempFilePath);
            await fs.unlink(req.files.portada.tempFilePath);
        } 
        let pdf = null
        if(req.files?.pdf){
            pdf = await uploadPdf(req.files.pdf.tempFilePath);
            await fs.unlink(req.files.pdf.tempFilePath);
        }
        
        if(!portada || !pdf){
            throw new Error("no se subieron los archivos correctamente");
        }
        
        const material = new Material({
            titulo: req.body.titulo,
            uploadedBy: token.id,
            uploadedAt: new Date(),
            precio: req.body.precio,
            editorial: req.body.editorial,
            autor: req.body.autor,
            anioMaterial: req.body.year_material,
            numeroPaginas: req.body.numero_paginas,
            descripcion: req.body.descripcion,
            portadaLibroUrl: portada.secure_url,
            pdfUrl: pdf.secure_url,
        });
        await material.save();

        return res.status(201).json({
            message: "material creado correctamente",
            material,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "error al crear el material",
            error: error,
        });
    }
};

const updateMaterial = async (req, res) => {
    try{
        const token = jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        const idMaterial = req.params.id;

        let material = {
            ...req.body,
            updated_at: new Date(),
            updated_by: token.id,
        };

        let portada = null
        if(req.files?.portada){
            portada = await uploadImage(req.files.portada.tempFilePath);
            await fs.unlink(req.files.portada.tempFilePath);

            material = {
                ...material,
                portada_libro: portada.secure_url,
            }
        } 

        console.log(material);

        let pdfUrl = null
        if(req.files?.pdf){
            pdfUrl = await uploadPdf(req.files.pdf.tempFilePath);
            await fs.unlink(req.files.pdf.tempFilePath);

            material = {
                ...material,
                pdf: pdfUrl.secure_url,
            }
        }

        console.log(material);
        
        const updatedMaterial = await Material.updateById(material, idMaterial);

        return res.status(200).json({
            message: "material actualizado correctamente",
            updatedMaterial,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "error al actualizar el material",
            error: error,
        });
    };
};

module.exports = {
    index,
    showMaterial,
    uploadMaterial,
    updateMaterial,
};