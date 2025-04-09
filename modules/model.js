import { rejects } from "assert";
import { error } from "console";
import { promises } from "dns";
import { syncBuiltinESMExports } from "module";
import mysql from "mysql2";
import { resolve } from "path";
import { deflate } from "zlib";

//configuracion 
var conexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"sistemas"

})

//abrir conexion
conexion.connect((error) => {
    if(error){
        console.log("surgio un error " + error);
    } else{
        console.log("Se conecto a la base de datos");
    }
});

var alumnosDB = {};
//funcion para insertar
alumnosDB.insertar = function insertar(alumno){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "INSERT INTO alumnos set ?"
        conexion.query(sqlConsulta,alumno,(error,res)=>{
            if(error){
                console.log("Surgio un error al insertar" + error);
                reject(error);
            } else{
                resolve(res.insertId);
            }
        })
    })
}
alumnosDB.mostrarTodos = function mostrarTodos(){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM alumnos";
        conexion.query(sqlConsulta,(error,resultado)=>{
            if(error){
                console.log("surgio un error" + error);
                reject(error);
            } else{
                console.log("Listado de alumnos obtenidos");
                resolve(resultado);
            }
        })
    })
}
const alumno = {
    matricula: 2020030187,
    nombre: "Jose Lopez",
    domicilio: "AV de las rosas",
    fechanac: "2025-02-09",
    sexo: "M",
    status:0

}

/* llamar a las funciones async/await
async function test(params) {
    try{
        //insertar el alumno 
        let id = await alumnosDB.insertar(alumno);
        console.log("Se inserto con Id " + id);
        let alumnos = await alumnosDB.mostrarTodos();
        console.log(alumnos);
    } catch(error){
        console.log("Surgio un error" + error);
    }
}

test();
export default alumnosDB; */

alumnosDB.buscarPorId = function buscarPorId(id){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM alumnos WHERE id = ?";
        conexion.query(sqlConsulta,[id],(error,resultado)=>{
            if(error){
                console.log("Error al buscar ID: " + error);
                reject(error);
            } else{
                resolve(resultado);
            }
        })
    })
}

alumnosDB.buscarPorMatricula = function buscarPorMatricula(matricula){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "SELECT * FROM alumnos WHERE matricula = ?";
        conexion.query(sqlConsulta,[matricula],(error,resultado)=>{
            if(error){
                console.log("Error al buscar matricula: " + error);
                reject(error);
            } else{
                resolve(resultado);
            }
        })
    })
}

alumnosDB.borrarPorId = function borrarPorId(id){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "DELETE FROM alumnos WHERE id = ?";
        conexion.query(sqlConsulta,[id],(error,resultado)=>{
            if(error){
                console.log("Error al borrar alumno: " + error);
                reject(error);
            } else{
                resolve("Alumno eliminado correctamente");
            }
        })
    })
}

alumnosDB.actualizarPorId = function actualizarPorId(id, nuevoAlumno){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "UPDATE alumnos SET ? WHERE id = ?";
        conexion.query(sqlConsulta,[nuevoAlumno,id],(error,resultado)=>{
            if(error){
                console.log("Error al actualizar alumno: " + error);
                reject(error);
            } else{
                resolve("Alumno actualizado correctamente");
            }
        })
    })
}

alumnosDB.cambiarStatus = function cambiarStatus(id){
    return new Promise((resolve,reject)=>{
        let sqlConsulta = "UPDATE alumnos SET status = NOT status WHERE id = ?";
        conexion.query(sqlConsulta,[id],(error,resultado)=>{
            if(error){
                console.log("Error al cambiar estado: " + error);
                reject(error);
            } else{
                resolve("Estado actualizado correctamente");
            }
        })
    })
}

/*async function test() {
    try{
        console.log("Insertando alumno...");
        let id = await alumnosDB.insertar(alumno);
        console.log("Se inserto con ID: " + id);
        
        console.log("Obteniendo lista de alumnos...");
        let alumnos = await alumnosDB.mostrarTodos();
        console.log("Lista de alumnos: ", alumnos);

        console.log("Actualizar alumnos...")
        alumno.nombre = "Maria Carbajo";
        alumno.domicilio = "Av del Sol 33";
        alumno.sexo = "F";
        await alumnosDB.actualizarPorId(id,alumno);
        // Consultar por id
        let objAlumno = await alumnosDB.buscarPorMatricula(alumno.matricula);
        console.log("Alumno consultado: ",objAlumno);
        console.log("Cambiar de estatus al alumno id = " + id);
        await alumnosDB.cambiarStatus(id);
        console.log("Mostrar alumno con cambio de estatus");
        
        let obj = await alumnosDB.buscarPorId(id);
        console.log("Alumno consultado: ", obj);
    } catch(error){
        console.error("Error en test(): " + error);
    }
}
test()*/

export default alumnosDB;