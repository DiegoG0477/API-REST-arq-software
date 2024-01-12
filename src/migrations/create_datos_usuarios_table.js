/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    CREATE TABLE datos_usuarios (
        id_usuario INT UNSIGNED NOT NULL,
        nombre VARCHAR(30) NULL DEFAULT NULL,
        apellido_pat VARCHAR(45) NULL DEFAULT NULL,
        apellido_mat VARCHAR(45) NULL DEFAULT NULL,
        PRIMARY KEY (id_usuario),
        CONSTRAINT fk_datos_usuarios_
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios (id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw("DROP TABLE datos_usuarios");
};