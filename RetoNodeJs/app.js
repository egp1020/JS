const express = require('express');
const mongoose = require('mongoose');
const PersonSchema = require('./models/person.js');

const app = express();
const router = express.Router();

app.use(express.urlencoded({extended: true,}));
app.use(express.json());

// Operaciones CRUD
router.get("/", (req, res)=>{
    PersonSchema.find(function (err, data) {
        if(err){
            console.log("Error leyendo las inscipciones.");
        } else{
            res.send(data);
        }
    })
});

router.get("/students", (req, res)=>{
    PersonSchema.find(function (err, data) {
        if(err){
            console.log("Error leyendo las inscipciones.");
        } else{
            res.send(data);
        }
    })
});

router.get("/inscripcion/:id", (req, res) => {
    PersonSchema.findById(req.params.id, function (err, dataPerson) {
        if(err){
            console.log("Error buscando la inscripción.");
        } else{ res.send(dataPerson); }
    })
});

router.post("/inscripcion", (req, res) => {
    let nuevaInscripcion = new PersonSchema({
        TypeDocument: req.body.document,
        Identification: req.body.identification,
        Names: req.body.name,
        LastNames: req.body.lastname,
        Address: req.body.address,
        HomePhone: req.body.homephone,
        CellPhone: req.body.cellphone,
        WebSite: req.body.website,
        ProfileDescription: req.body.description,
    });

    nuevaInscripcion.save(function(err, data) {
        if(err){ console.log(err); }
        res.send("Inscripción almacenada correctamente.");
    })
});

router.put("/inscripcion/:id", (req, res) => {
    PersonSchema.findById(req.params.id, function (err, dataPerson) {
        dataPerson.TypeDocument = req.body.document;
        dataPerson.Identification = req.body.identification;
        dataPerson.Names = req.body.name;
        dataPerson.LastNames = req.body.lastname;
        dataPerson.Address = req.body.address;
        dataPerson.HomePhone = req.body.homephone;
        dataPerson.CellPhone = req.body.cellphone;
        dataPerson.WebSite = req.body.website;
        dataPerson.ProfileDescription = req.body.description;

        dataPerson.save(function (err, dataPerson) {
            if(err){ console.log(err); }
            res.send("Inscripción actualizada");
        });
    });
});

router.delete("/inscripcion/:id", (req, res) =>{
    PersonSchema.findById(req.params.id, function (err, dataPerson) {
        dataPerson.remove(function (err) {
            if(err){
                console.log("No se pudo eliminar la inscripción. "+ err);
            }
            res.send("Eliminación éxitosa")
        });
    });
});

// Conexión a base de datos

mongoose.connect("mongodb+srv://pro_web:ProgWebMintic2022@clusterprogweb.relcg.mongodb.net/InscipcionesDB?retryWrites=true&w=majority", function (err, res) {
    if (err) { console.log("Error: conectando a base de datos. "+err);}
    app.listen(3000, () => {
        console.log("Servidor corriendo en el puerto 3000.")
    });
});
app.use(router);
