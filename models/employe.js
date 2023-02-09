const mongoose = require('mongoose')

const employeShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom !'],
    },
    lastname: {
        type: String,
        required: [true, 'Pas de prenom !'],
    },
    phone: {
        type: Number,
        required: [true, 'Pas de telephone !'],
    },
    age: {
        type: Number,
        required: [true, "Pas d'age !"],
    },
    sexe: {
        type: String,
        required: [true, "Pas de sexe !"],
    },
    image: {
        type: String,
        required: [true, 'Pas de photo ! !']
    },
    fonction: {
        type: String,
        required: [true, 'Pas de fonctions !']
    },
    blame: {
        default:0,
        type: String,
    }
})

const employeModel = mongoose.model('employes', employeShema);

module.exports = employeModel
