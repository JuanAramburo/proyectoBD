import express,{Router} from "express";
import json from "body-parser";

import path from "path";
import { fileURLToPath } from "url";
import {sumar,restar,PI, alumnos, data} from "../modules/librerias.js"
import alumnosDB from "../modules/model.js";
import mysql from "mysql2";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

/*router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/1',(req,res)=>{
    res.send(data);
})


router.get('/api/alumnos',(req,res) =>{
    res.json(alumnos);
})

router.get('/getapi',(req,res) =>{
    res.sendFile(path.join(__dirname, "../getAPI.html"))
})

router.get('/api/alumnos/:idAlumno',(req,res) =>{
    const {idAlumno} = req.params

    const alumnoid = alumnos.find(alumno => alumno.id == idAlumno);

    if (alumnoid) {
        res.json(alumnoid);
    } else {
        res.status(404).json({ error: 'Alumno no encontrado' });
    }
}) */
  

router.get("/", async (req,res)=>{
    try{
        const alumnos = await alumnosDB.mostrarTodos();
        res.json(alumnos);
    } catch(error){
        res.status(500).json({error: "Error al mostrar los alumnos"});
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const alumno = await alumnosDB.buscarPorId(req.params.id);
        if(alumno.length > 0){
            res.json(alumno[0]);
        } else{
            res.status(404).json({error: "Alumno no encontrado"});
        }
    } catch(error){
        res.status(500).json({error: "Error al mostrar el alumno"});
    }
})

router.get("/matricula/:matricula", async (req,res)=>{
    try{
        const alumno = await alumnosDB.buscarPorMatricula(req.params.matricula);
        if(alumno.length > 0){
            res.json(alumno);
        } else{
            res.status(404).json({error: "Alumno no encontrado"});
        }
    } catch(error){
        res.status(500).json({error: "Error al mostrar el alumno"});
    }
})

router.post("/", async (req,res)=>{
    try{
        const nuevoAlumno = req.body;
        const id = await alumnosDB.insertar(nuevoAlumno);
        res.status(201).json({id, message: "Alumno insertado correctamente", id});
    } catch(error){
        res.status(500).json({error: "Error al insertar el alumno"});
    }
})


router.put("/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const datosActualizados = req.body;
        const resultado = await alumnosDB.actualizarPorId(id,datosActualizados);
        res.json({message: "Alumno actualizado correctamente"});

    } catch(error){
        res.status(500).json({error: "Error al actualizar el alumno"});
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        await alumnosDB.borrarPorId(id);
        res.json({message: "Alumno eliminado correctamente"});
    } catch(error){
        res.status(500).json({error: "Error al eliminar el alumno"});
    }
})

router.patch("/:id/status", async (req,res)=>{
    try{
        const id = req.params.id;
        await alumnosDB.cambiarStatus(id);
        res.json({message: "Estado cambiado correctamente"});
    } catch(error){
        res.status(500).json({error: "Error al cambiar el estado"});
    }
})




export default router;
