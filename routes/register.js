const express = require("express");
const registerRouter = express.Router();
const CompanieModel = require("../models/companie.js");
const EmployeModel = require("../models/employe.js");
const crypto = require('../customDependance/crypto.js')
const CompanieGuard = require('../customDependance/companieGuard.js')
let companieGuard = require('../customDependance/companieGuard.js')
const upload = require('../customDependance/multer.js')

registerRouter.get("/company/register", async (req, res) => {
  try {
    let companie = await CompanieModel.findOne({
      _id: req.session.CompanieId
    })
    if (companie) {
      res.redirect('/company/home')
    }else{
      res.render("registerCompanie.twig");
    }
  } catch (err) {
    res.send(err);
  }
});

registerRouter.post("/company/register", async (req, res) => {
  try {
    req.body.password = await crypto.cryptPassword(req.body.password);
    let companie = new CompanieModel(req.body);
    companie.save();
    res.redirect('/company/home')
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


registerRouter.get("/company/employee/register",CompanieGuard, async (req, res) => {
  try {
    res.render("registerEmploye.twig");
  } catch (err) {
    res.send(err);
  }
});

registerRouter.post("/company/employee/register",CompanieGuard,upload.single('image'), async (req, res) => {
  try {
    if(req.file){
      req.body.image = req.file.filename
    }
    let employe = new EmployeModel(req.body);
    employe.save();
    await CompanieModel.updateOne({_id: req.session.CompanieId},{$push:{employes: employe._id}})
    res.redirect('/company/home')
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = registerRouter;
