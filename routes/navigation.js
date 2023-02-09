const express = require("express");
const navigationRouter = express.Router();
const EmployeModel = require('../models/employe.js')
const CompanieModel = require('../models/companie.js')
const CompanieGuard = require('../customDependance/companieGuard.js')
const upload = require('../customDependance/multer.js')

navigationRouter.get("/company/home",CompanieGuard, async (req, res) => {
  try {
    let employee = await EmployeModel.find()
    let companie = await CompanieModel.findOne({_id: req.session.CompanieId}).populate('employes')
    let Companie = req.session.Companie
    let Error = req.session.error
    req.session.error = ""
    if (employee.blame > 2) {
      res.redirect(`/company/employee/delete/${employee.id}`);
    }else{
      res.render("home.twig",{
        employes: companie.employes,
        Companie: Companie,
        error: Error,
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

navigationRouter.get("/company/disconect",CompanieGuard, async (req, res) => {
  try {
    res.redirect('/company/login')
    req.session.destroy()
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


module.exports = navigationRouter;
