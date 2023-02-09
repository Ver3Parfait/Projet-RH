const CompanieModel = require("../models/companie.js")

let CompanieGuard = async (req,res,next) => { //C'est un middleware qui permettra de verifier si l'utilisateur est connecté ou non
    let companie = await CompanieModel.findOne({_id: req.session.CompanieId})
    if (companie) {
        next() // permet de passer au middleware suivant. en l'occurence dans ce projet, le corps de la route (middleware final)
    }else{
        res.redirect('/company/login')
    }
}



module.exports = CompanieGuard