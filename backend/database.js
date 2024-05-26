const mysql = require('mysql2');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;


console.log('DB_HOST:', DB_HOST); // Verifica que las variables de entorno se están cargando

const connectionPool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

// Función para ejecutar consultas SQL de manera asíncrona
const query = async(sql, values = []) => {
    try{
        //console.log('Datos del connectionPool:', connectionPool.config);
        const result = await connectionPool.promise().query(sql,values);
        return result[0];
    } catch(error){
        if (error.code === 'ECONNREFUSED') {
            // Si la conexión es rechazada, mostramos un mensaje de error y salimos del proceso
            console.error('¡Error: la conexión a la base de datos fue rechazada!');
            process.exit(1);
        } else {
            // Manejamos otros errores imprevistos imprimiendo el mensaje de error
            console.error('¡Error al ejecutar la consulta SQL:', error.message);
            // Devolvemos el error para que sea manejado por el código que llamó a la función query
            return error;
        }
    }
}

// Función para probar la conexion a la base de datos
const testConnection = async () => {
    const result = await query('SELECT 1 + 1 AS solution');
    if (result) console.log("Conectado correctamente a la base de datos") ;
}

module.exports = { query, testConnection };