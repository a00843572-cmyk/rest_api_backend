import { getConnection, sql } from "../utils/db.js";


// OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
            .request()
            .query("SELECT * FROM Users");

        res.json(result.recordset);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error al obtener los usuarios"
        });

    }
};


// OBTENER UN USUARIO POR ID
export const getUserById = async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", sql.Int, req.params.id)
            .query("SELECT * FROM Users WHERE id = @id");

        if (result.recordset.length === 0) {

            return res.status(404).json({
                message: "Usuario no encontrado"
            });

        }

        res.json(result.recordset[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error al obtener el usuario"
        });

    }
};


// CREAR USUARIO
export const createUser = async (req, res) => {

    try {

        const {
            name,
            age,
            points,
            username,
            password
        } = req.body;

        const pool = await getConnection();

        await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("age", sql.Int, age)
            .input("points", sql.Int, points)
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query(`
                INSERT INTO Users
                (name, age, points, username, password)
                VALUES
                (@name, @age, @points, @username, @password)
            `);

        res.status(201).json({
            message: "Usuario creado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error al crear usuario"
        });

    }
};


// ACTUALIZAR USUARIO
export const updateUser = async (req, res) => {

    try {

        const {
            name,
            age,
            points,
            username,
            password
        } = req.body;

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", sql.Int, req.params.id)
            .input("name", sql.VarChar, name)
            .input("age", sql.Int, age)
            .input("points", sql.Int, points)
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query(`
                UPDATE Users
                SET
                    name = @name,
                    age = @age,
                    points = @points,
                    username = @username,
                    password = @password
                WHERE id = @id
            `);

        if (result.rowsAffected[0] === 0) {

            return res.status(404).json({
                message: "Usuario no encontrado"
            });

        }

        res.json({
            message: "Usuario actualizado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error al actualizar usuario"
        });

    }
};


// ELIMINAR USUARIO
export const deleteUser = async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", sql.Int, req.params.id)
            .query("DELETE FROM Users WHERE id = @id");

        if (result.rowsAffected[0] === 0) {

            return res.status(404).json({
                message: "Usuario no encontrado"
            });

        }

        res.json({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error al eliminar usuario"
        });

    }
};