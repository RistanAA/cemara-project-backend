const express = require("express");
const router = express.Router();
// const cors = require("cors");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcryptjs");

const JWTSECRETKEY = "cemara";

const User = require("../schemas/user");
// Users.use(cors());

const re_pass = /^[a-zA-Z0-9]{4,30}$/;
const userSchema = joi.object({
  email: joi.string().required(),
  // phoneNumber: joi.string().required(),
  namaLembaga: joi.string().required(),
  password: joi.string().pattern(re_pass).required(),
});

router.post("/register", async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  const userData = await userSchema.validateAsync(req.body)

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({ message: `${user.email} registered succesfully` });
            })
            .catch((err) => {
              res.send(err);
            });
        });
      } else {
        res.status(400).json({ message: `User already exist` });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({ userId: user.userId }, JWTSECRETKEY, {
            expiresIn: "1 days",
          });
          res.json({
            message: `${user.email} login succesfully`,
            namaLembaga: user.namaLembaga,
            email: user.email,
            userId: user.userId,
            token,
          });
        } else {
          res.status(400).json({ message: "invalid credentials" });
        }
      } else {
        res.status(400).json({ message: "user doesnt exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

router.put("/profil/edit/:id", async (req, res) => {
  const { id } = req.params;
  const myquery = { userId: id };
  const updateData = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      about: req.body.about,
      image: req.body.image,
    },
  };
  const data = await User.updateOne(
    myquery,
    updateData,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  ).clone();
  return res.status(200).json(updateData.$set);
});

router.get("/profil/:Id", async (req, res) => {
  const { Id } = req.params;
  const dataProfil = await User.find({ userId: Id })
  // console.log(dataProfil)
  const data = dataProfil.map(data => {
    return {
      name: data.name,
      email: data.email,
      username: data.username,
      about: data.about,
      image: data.image
    }
  })
  res.json(data)
})

module.exports = router;
