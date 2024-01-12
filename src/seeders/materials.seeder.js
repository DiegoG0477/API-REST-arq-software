const db = require("../configs/db.config");
const Material = require("../models/material.model");

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("conectado a la base de datos");
        insertMany();
    }
});

const insertMany = async () => {
    Material.truncateTable();

    await new Material("titulo1", 1, 100, "editorial1", "autor1", 2021, 100, "descripcion1", "portadaLibroUrl1", "pdfUrl1").save();
    await new Material("titulo2", 2, 200, "editorial2", "autor2", 2021, 200, "descripcion2", "portadaLibroUrl2", "pdfUrl2").save();
    await new Material("titulo3", 3, 300, "editorial3", "autor3", 2021, 300, "descripcion3", "portadaLibroUrl3", "pdfUrl3").save();
    await new Material("titulo4", 4, 400, "editorial4", "autor4", 2021, 400, "descripcion4", "portadaLibroUrl4", "pdfUrl4").save();
    await new Material("titulo5", 5, 500, "editorial5", "autor5", 2021, 500, "descripcion5", "portadaLibroUrl5", "pdfUrl5").save();
    await new Material("titulo6", 6, 600, "editorial6", "autor6", 2021, 600, "descripcion6", "portadaLibroUrl6", "pdfUrl6").save();
    await new Material("titulo7", 7, 700, "editorial7", "autor7", 2021, 700, "descripcion7", "portadaLibroUrl7", "pdfUrl7").save();
    await new Material("titulo8", 8, 800, "editorial8", "autor8", 2021, 800, "descripcion8", "portadaLibroUrl8", "pdfUrl8").save();
    await new Material("titulo9", 9, 900, "editorial9", "autor9", 2021, 900, "descripcion9", "portadaLibroUrl9", "pdfUrl9").save();
    await new Material("titulo10", 10, 1000, "editorial10", "autor10", 2021, 1000, "descripcion10", "portadaLibroUrl10", "pdfUrl10").save();
}
