/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    CREATE TABLE usuarios(
        id_usuario INT UNSIGNED NOT NULL AUTO_INCREMENT,
        email VARCHAR(30) NULL DEFAULT NULL,
        password VARCHAR(60) NULL DEFAULT NULL,
        created_at DATE NULL DEFAULT NULL,
        updated_at DATE NULL DEFAULT NULL,
        updated_by INT UNSIGNED NULL DEFAULT NULL,
        deleted TINYINT NULL DEFAULT NULL,
        deleted_at DATE NULL DEFAULT NULL,
        deleted_by INT UNSIGNED NULL DEFAULT NULL,
        id_tipo TINYINT UNSIGNED NULL,
        PRIMARY KEY (id_usuario),
        INDEX fk_usuarios_1_idx (id_tipo ASC) VISIBLE,
        CONSTRAINT fk_usuarios_1
        FOREIGN KEY (id_tipo)
        REFERENCES tipo_usuarios (id_tipo)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw("DROP TABLE usuarios");
};
