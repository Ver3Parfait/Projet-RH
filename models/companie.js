const mongoose = require('mongoose')

const companieShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom !'],
    },
    siret: {
        type: Number,
        required: [true, 'Pas de numéros de SIRET !']
    },
    ceo: {
        type: String,
        required: [true, 'Pas de directeur !'],
    },
    email: {
        type: String,
        required: [true, 'Pas de mail'],
    },
    password: {
        type: String,
        required: [true, 'Pas de mot de passe']
    },
    employes: {
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "employes"
            }
        ],
    }
})

const CompanieModel = mongoose.model('Companies', companieShema);

module.exports = CompanieModel
