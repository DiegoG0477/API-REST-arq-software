/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    CREATE TABLE material (
        id_material INT UNSIGNED NOT NULL AUTO_INCREMENT,
        titulo VARCHAR(45) NULL DEFAULT NULL,
        uploaded_at DATE NULL DEFAULT NULL,
        uploaded_by INT UNSIGNED NULL DEFAULT NULL,
        precio TINYINT UNSIGNED NULL DEFAULT NULL,
        editorial VARCHAR(30) NULL DEFAULT NULL,
        autor VARCHAR(45) NULL DEFAULT NULL,
        year_material YEAR NULL DEFAULT NULL,
        numero_paginas TINYINT UNSIGNED NULL DEFAULT NULL,
        descripcion TEXT NULL DEFAULT NULL,
        portada_libro VARCHAR(255) NULL DEFAULT NULL,
        pdf VARCHAR(255) NULL DEFAULT NULL,
        updated_at DATE NULL DEFAULT NULL,
        updated_by INT UNSIGNED NULL DEFAULT NULL,
        PRIMARY KEY (id_material),
        INDEX fk_material_1_idx (uploaded_by ASC) VISIBLE,
        INDEX fk_material_2_idx (updated_by ASC) VISIBLE,
        CONSTRAINT fk_material_1
        FOREIGN KEY (uploaded_by)
        REFERENCES usuarios (id_usuario),
        CONSTRAINT fk_material_2
        FOREIGN KEY (updated_by)
        REFERENCES datos_usuarios (id_usuario));
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw("DROP TABLE material");
};