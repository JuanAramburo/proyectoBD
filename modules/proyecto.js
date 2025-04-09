import { rejects } from "assert";
import { error } from "console";
import { promises } from "dns";
import { syncBuiltinESMExports } from "module";
import mysql from "mysql2";
import { resolve } from "path";
import { deflate } from "zlib";

//configuracion 
var conexion = mysql.createConnection({
    host:"52.15.227.168",
    user:"root",
    password:"upsin123",
    database:"brothers"

})

//abrir conexion
conexion.connect((error) => {
    if(error){
        console.log("surgio un error " + error);
    } else{
        console.log("Se conecto a la base de datos");
    }
});

var brothersDB = {};
//funcion para insertar
brothersDB.insertarPizza = function insertarPizza(pizza) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "INSERT INTO pizzas (idPizzas, tamaños, uno, dos, cinco) VALUES (?, ?, ?, ?, ?)";
        const valores = [pizza.idPizzas, pizza.tamaños, pizza.uno, pizza.dos, pizza.cinco];

        console.log("SQL:", sqlConsulta); // Depuración
        console.log("Valores:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al insertar la pizza:", error);
                reject(error);
            } else {
                resolve(resultado.insertId);
            }
        });
    });
};

brothersDB.insertarEspecialidad = function insertarEspecialidad(especialidad) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "INSERT INTO especialidades (idEspecialidad, especialidad, ingredientes, urlimg) VALUES (?, ?, ?, ?)";
        const valores = [especialidad.idEspecialidad, especialidad.especialidad, especialidad.ingredientes, especialidad.urlimg];

        console.log("SQL para insertar especialidad:", sqlConsulta); // Depuración
        console.log("Valores para insertar especialidad:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al insertar la especialidad:", error);
                reject(error);
            } else {
                resolve(resultado.insertId);
            }
        });
    });
};

brothersDB.insertarAdicional = function insertarAdicional(adicional) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "INSERT INTO adicionales (idAdicional, adicional, precio, urlimag) VALUES (?, ?, ?, ?)";
        const valores = [adicional.idAdicional, adicional.adicional, adicional.precio, adicional.urlimag];

        console.log("SQL:", sqlConsulta); // Depuración
        console.log("Valores:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al insertar el adicional:", error);
                reject(error);
            } else {
                resolve(resultado.insertId);
            }
        });
    });
};

brothersDB.insertarBebida = function insertarBebida(bebida) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "INSERT INTO bebidas (idBebida, bebida, precio) VALUES (?, ?, ?)";
        const valores = [bebida.idBebida, bebida.bebida, bebida.precio];

        console.log("SQL:", sqlConsulta); // Depuración
        console.log("Valores:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al insertar la bebida:", error);
                reject(error);
            } else {
                resolve(resultado.insertId);
            }
        });
    });
};

//pizzas

brothersDB.mostrarPizzas = function mostrarPizzas(){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM pizzas";
        conexion.query(sqlConsulta,(error,resultado)=>{
            if(error){
                console.log("surgio un error" + error);
                reject(error);
            } else{
                console.log("Listado de pizzas obtenidas");
                resolve(resultado);
            }
        })
    })
}

//especialidades
brothersDB.mostrarEspecialidad = function mostrarEspecialidad(){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM especialidades";
        conexion.query(sqlConsulta,(error,resultado)=>{
            if(error){
                console.log("surgio un error" + error);
                reject(error);
            } else{
                console.log("Listado de especialidades obtenidas");
                resolve(resultado);
            }
        })
    })
}

brothersDB.mostrarAdicional = function mostrarAdicional(){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM adicionales";
        conexion.query(sqlConsulta,(error,resultado)=>{
            if(error){
                console.log("surgio un error" + error);
                reject(error);
            } else{
                console.log("Listado de adicionales obtenidas");
                resolve(resultado);
            }
        })
    })
}

brothersDB.mostrarBebida = function mostrarBebida(){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM bebidas";
        conexion.query(sqlConsulta,(error,resultado)=>{
            if(error){
                console.log("surgio un error" + error);
                reject(error);
            } else{
                console.log("Listado de bebidas obtenidas");
                resolve(resultado);
            }
        })
    })
}

brothersDB.buscarPorIdPizzas = function buscarPorIdPizzas(idPizzas){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM pizzas WHERE idPizzas = ?";
        conexion.query(sqlConsulta,[idPizzas],(error,resultado)=>{
            if(error){
                console.log("Error al buscar ID: " + error);
                reject(error);
            } else{
                resolve(resultado);
            }
        })
    })
}

brothersDB.buscarPorIdEspecialidad = function buscarPorIdEspecialidad(idEspecialidad){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM especialidades WHERE idEspecialidad = ?";
        conexion.query(sqlConsulta,[idEspecialidad],(error,resultado)=>{
            if(error){
                console.log("Error al buscar ID: " + error);
                reject(error);
            } else{
                resolve(resultado);
            }
        })
    })
}

brothersDB.buscarPorIdAdicionales = function buscarPorIdAdicionales(idAdicional){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM adicionales WHERE idAdicional = ?";
        conexion.query(sqlConsulta,[idAdicional],(error,resultado)=>{
            if(error){
                console.log("Error al buscar ID: " + error);
                reject(error);
            } else{
                resolve(resultado);
            }
        })
    })
}

brothersDB.buscarPorIdBebidas = function buscarPorIdBebidas(idBebida){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM bebidas WHERE idBebida = ?";
        conexion.query(sqlConsulta,[idBebida],(error,resultado)=>{
            if(error){
                console.log("Error al buscar ID: " + error);
                reject(error);
            } else{
                resolve(resultado);
            }
        })
    })
}

brothersDB.borrarPorIdPizzas = function borrarPorIdPizzas(id) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "DELETE FROM pizzas WHERE idPizzas = ?";
        console.log("SQL para eliminar:", sqlConsulta); // Depuración
        console.log("ID para eliminar:", id); // Depuración

        conexion.query(sqlConsulta, [id], (error, resultado) => {
            if (error) {
                console.error("Error al eliminar la pizza:", error);
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
};

brothersDB.borrarPorIdEsp = function borrarPorIdEsp(id) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "DELETE FROM especialidades WHERE idEspecialidad = ?";
        console.log("SQL para eliminar:", sqlConsulta); // Depuración
        console.log("ID para eliminar:", id); // Depuración

        conexion.query(sqlConsulta, [id], (error, resultado) => {
            if (error) {
                console.error("Error al eliminar la pizza:", error);
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
};

brothersDB.borrarPorIdAdi = function borrarPorIdAdi(id) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "DELETE FROM adicionales WHERE idAdicional = ?";
        console.log("SQL para eliminar:", sqlConsulta); // Depuración
        console.log("ID para eliminar:", id); // Depuración

        conexion.query(sqlConsulta, [id], (error, resultado) => {
            if (error) {
                console.error("Error al eliminar el adicional:", error);
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
};

brothersDB.borrarPorIdBeb = function borrarPorIdBeb(id) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "DELETE FROM bebidas WHERE idBebida = ?";
        console.log("SQL para eliminar:", sqlConsulta); // Depuración
        console.log("ID para eliminar:", id); // Depuración

        conexion.query(sqlConsulta, [id], (error, resultado) => {
            if (error) {
                console.error("Error al eliminar la bebida:", error);
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
};

brothersDB.actualizarPorIdPizza = function actualizarPorIdPizza(id, datosActualizados) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "UPDATE pizzas SET tamaños = ?, uno = ?, dos = ?, cinco = ? WHERE idPizzas = ?";
        const valores = [datosActualizados.tamaños, datosActualizados.uno, datosActualizados.dos, datosActualizados.cinco, id];

        console.log("SQL para actualizar:", sqlConsulta); // Depuración
        console.log("Valores para actualizar:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al actualizar la pizza:", error);
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
};

brothersDB.actualizarPorIdEsp = function actualizarPorIdEsp(id, datosActualizados) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "UPDATE especialidades SET especialidad = ?, ingredientes = ?, urlimg = ? WHERE idEspecialidad = ?";
        const valores = [datosActualizados.especialidad, datosActualizados.ingredientes, datosActualizados.urlimg, id];

        console.log("SQL para actualizar:", sqlConsulta); // Depuración
        console.log("Valores para actualizar:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al actualizar la pizza:", error);
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
};

brothersDB.actualizarPorIdAdi = function actualizarPorIdAdi(id, datosActualizados) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "UPDATE adicionales SET adicional = ?, precio = ?, urlimag = ? WHERE idAdicional = ?";
        const valores = [datosActualizados.adicional, datosActualizados.precio, datosActualizados.urlimag, id];

        console.log("SQL para actualizar:", sqlConsulta); // Depuración
        console.log("Valores para actualizar:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al actualizar la pizza:", error);
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
};

brothersDB.actualizarPorIdBeb = function actualizarPorIdBeb(id, datosActualizados) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "UPDATE bebidas SET bebida = ?, precio = ? WHERE idBebida = ?";
        const valores = [datosActualizados.bebida, datosActualizados.precio, id];

        console.log("SQL para actualizar:", sqlConsulta); // Depuración
        console.log("Valores para actualizar:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al actualizar la bebida:", error);
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
};

brothersDB.insertarUsuario = function insertarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "INSERT INTO usuarios (correo, contraseña) VALUES (?, ?)";
        const valores = [usuario.correo, usuario.contraseña];

        console.log("SQL para insertar usuario:", sqlConsulta); // Depuración
        console.log("Valores para insertar usuario:", valores); // Depuración

        conexion.query(sqlConsulta, valores, (error, resultado) => {
            if (error) {
                console.error("Error al insertar el usuario:", error);
                reject(error);
            } else {
                resolve(resultado.insertId);
            }
        });
    });
};

brothersDB.buscarUsuarioPorCorreo = function buscarUsuarioPorCorreo(correo) {
    return new Promise((resolve, reject) => {
        const sqlConsulta = "SELECT * FROM usuarios WHERE correo = ?";
        conexion.query(sqlConsulta, [correo], (error, resultado) => {
            if (error) {
                console.error("Error al buscar el usuario:", error);
                reject(error);
            } else {
                resolve(resultado[0]); // Devuelve el primer resultado
            }
        });
    });
};

export default brothersDB;