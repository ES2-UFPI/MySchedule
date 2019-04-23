const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    Nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    Atividades:{
       //array de atividades
    },
    ///outros atributos
});

mongoose.model('Usuario', UsuarioSchema);