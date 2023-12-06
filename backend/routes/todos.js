var express = require("express");
var router = express.Router();
var Joi = require("joi");
var dbUtils = require("../../db/dbUtils");

const schema = Joi.object({
  content: Joi.string().alphanum().min(3).max(30).required(),
  user_id: Joi.number().integer().min(0).max(10000).required(),
});

const editSchema = Joi.object({
  content: Joi.string(),
  status: Joi.boolean(),
  is_deleted: Joi.boolean(),
}).xor("content", "status", "is_deleted");

router.get("/:userId", async function (req, res, next) {
  let data = await dbUtils.getUserData("todos", req.params.userId);
  if (data) {
    return res.send(data);
  }
  return res.status(404).send("ERROR READING USERS DATA");
});

router.post("/:userId", async function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Schema");
  }
  let data = await dbUtils.postUserData("todos", [
    parseInt(req.body.user_id),
    req.body.content,
  ]);
  if (data) {
    return res.send({
      ...req.body,
      is_deleted: false,
      status: false,
    });
  }
  return res.status(404).send("ERROR ADDING TODO");
});

router.put("/:userId/:commentId", async function (req, res, next) {
  const { error } = editSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send("Need To get one of the fields : content, status, is_deleted");
  }
  let data = await dbUtils.updateUserData(
    "todos",
    Object.keys(req.body)[0],
    Object.values(req.body)[0],
    req.params.userId,
    req.params.commentId
  );
  if (data) {
    return res.send(data[1][0]);
  }
  return res.status(404).send("ERROR MODIFIYING TODO");
});

module.exports = router;
