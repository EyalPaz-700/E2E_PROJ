var express = require("express");
var router = express.Router();
var Joi = require("joi");
var dbUtils = require("../../db/dbUtils");

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().alphanum().min(3).max(30).required(),
});

router.post("/", async function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Schema");
  }
  let data = await dbUtils.getUser(req.body);
  if (data) {
    return res.send(data[0]);
  }
  return res.status(404).send("ERROR LOGGING IN USER");
});

module.exports = router;
