const express = require("express");
const loginRouter = express.Router();
const CompanieModel = require('../models/companie.js')
const crypto = require("../customDependance/crypto.js");



loginRouter.get("/", async (req, res) => {
  try {
    res.redirect('/company/login')
  } catch (err) {
    res.send(err);
  }
});

loginRouter.get("/company/login", async (req, res) => {
  try {
    let companie = await CompanieModel.findOne({ _id: req.session.CompanieId });
    if (companie) {
      res.redirect("/company/home");
      }else{
        res.render("login.twig",{
          message: req.session.message
        });
      }
  } catch (err) {
    res.send(err);
  }
});

loginRouter.post("/company/login", async (req, res) => {
  try {
    let companie = await  CompanieModel.findOne({
      email : req.body.email,
    })
    if (companie) {
      if (await crypto.comparePassword(req.body.password, companie.password)) {
        req.session.CompanieId = companie._id
        req.session.Companie = companie.name
        res.redirect('/company/home')
      }else{
        req.session.message = "Mot de passe incorect !"
        res.redirect('/company/home')
      }
    }else{
      req.session.error = "Chips"
      res.redirect('/company/home')
    }
  } catch (err) {
    res.send(err);
  }
});



module.exports = loginRouter;
