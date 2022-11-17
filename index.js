const express = require('express')
const app = express()
const mongoose = require('mongoose');
const argon2 = require('argon2');
const { User } = require("./model/user");
var jwt = require('jsonwebtoken');


app.use(express.urlencoded({
    extended: true
}))


app.post('/user', async(req, res) => {
    console.log(req.body.nom)
    console.log(req.body.prenom)
    console.log(req.body.email)
    console.log(req.body.password)

    const hash = await argon2.hash(req.body.password);

    const user = new User({
      nom: req.body.nom,
      email: req.body.email,
      prenom: req.body.prenom,
      password: hash
    })
    console.log(user)

    await user.save()

    return res.status(200).json({
     error: false,
     message: "Hello world"
   })
 })

 app.get("/token/create", async(req, res) => {
  var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  return res.status(200).json({
    error: false,
    message: token
  })
})
 
const start = async () => {
  try {
    mongoose.connect(
      "mongodb://0.0.0.0:27017/test"
    ).catch(err => console.log(err.reason))
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();