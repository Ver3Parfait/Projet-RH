const express = require("express");
const employeeRouter = express.Router();
const EmployeModel = require('../models/employe.js')
const CompanieModel = require('../models/companie.js')
const CompanieGuard = require('../customDependance/companieGuard.js')
const upload = require('../customDependance/multer.js')

employeeRouter.get("/company/employee/get",CompanieGuard, async (req, res) => {
  try {
    let companie = await CompanieModel.findOne({_id: req.session.CompanieId}).populate('employes')
    res.send({
      employees: companie.employes,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

employeeRouter.get("/company/employee/delete/:id",CompanieGuard, async (req, res) => {
  try {
    let employee = await EmployeModel.findOne({_id: req.params.id})
    if (employee._id == "63dbb522ddea86f4ac3677f6") {
      req.session.error = "Vous ne pouvez pas supprimer Pascal la vitesse !"
      res.redirect("/company/home");
    }else{
      await EmployeModel.deleteOne({_id: req.params.id})
      await CompanieModel.updateOne({_id: req.session.CompanieId},{$pull:{employes: req.params.id}})
      res.redirect("/company/home");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

employeeRouter.get("/company/employee/deletes/:id",CompanieGuard, async (req, res) => {
  try {
    let test = req.params.id
      await EmployeModel.deleteMany({_id:{ $in: test }})
      await CompanieModel.updateOne({_id: req.session.CompanieId},{$pull:{employes:{ $in:test}}})
      arrayEMployees = []
      res.redirect("/company/home");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


employeeRouter.get("/company/employee/update/:id",CompanieGuard, async (req, res) => {
  try {
    res.render("ModifyEmployee.twig",{
      _id: req.params.id,
      employe: employe
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

employeeRouter.post("/company/employee/update/:id", CompanieGuard, upload.single('image'), async (req, res) => {
  try {
    if(req.file){
      req.body.image = req.file.filename
    }
    await EmployeModel.updateOne({_id: req.params.id}, req.body)
    res.redirect('/company/home');
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


employeeRouter.get("/company/employee/blame/:id", CompanieGuard, async (req, res) => {
  try {
    let employee = await EmployeModel.findOne({_id: req.params.id})
      if (employee.blame >= 2 && employee._id != "63dbb522ddea86f4ac3677f6") {
        res.redirect(`/company/employee/delete/${req.params.id}`);
      }else if(employee._id == "63dbb522ddea86f4ac3677f6"){
        req.session.error = "Vous ne pouvez pas Blamer Pascal la vitesse, désolé Thomas ..."
        let thomas = await EmployeModel.findOne({_id: "63da6e72b43750f7db3fdc5c"})
        await EmployeModel.updateOne({_id: "63da6e72b43750f7db3fdc5c"}, {blame: parseInt(thomas.blame) + 1})
        res.redirect('/company/home');
      }else{
        await EmployeModel.updateOne({_id: req.params.id}, {blame: parseInt(employee.blame) + 1})
        res.redirect('/company/home');
      }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

employeeRouter.get("/company/employee/blame/delete/:id", CompanieGuard, async (req, res) => {
  try {
    let employee = await EmployeModel.findOne({_id: req.params.id})
      if (employee.blame < 1 && employee._id != "63dbb522ddea86f4ac3677f6") {
        req.session.error = "Cette utilisateut n'as pas de blâme ."
        res.redirect(`/company/home`);
      }else if(employee._id == "63dbb522ddea86f4ac3677f6"){
        req.session.error = "Pascal la vitesse, n'as pas de blame mais -1 quand même!"
        let pascal = await EmployeModel.findOne({_id: "63dbb522ddea86f4ac3677f6"})
        await EmployeModel.updateOne({_id: "63dbb522ddea86f4ac3677f6"}, {blame: parseInt(pascal.blame) - 1})
        res.redirect('/company/home');
      }else{
        await EmployeModel.updateOne({_id: req.params.id}, {blame: parseInt(employee.blame) - 1})
        res.redirect('/company/home');
      }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});


module.exports = employeeRouter;
