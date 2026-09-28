import sql from "mssql";

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export const getConnection = async () => {
    try {

        const pool = await sql.connect(config);

        console.log("Conexion a SQL Server correcta");

        return pool;

    } catch (error) {

        console.log("Error de conexion a SQL Server");
        console.log(error);

        throw error;
    }
};

export { sql };