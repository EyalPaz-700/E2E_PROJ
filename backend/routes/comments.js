var express = require("express");
var router = express.Router();
var Joi = require("joi");
var dbUtils = require("../../db/dbUtils");

const schema = Joi.object({
  user_id: Joi.number().integer().min(0).max(10000).required(),
  content: Joi.string().required(),
});
const editSchema = Joi.object({
  content: Joi.string().min(1),
  user_id: Joi.number().integer(),
});

router.post("/:post_id", async function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Schema");
  }
  let data = await dbUtils.postUserData("comments", [
    req.body.user_id,
    req.body.content,
    parseInt(req.params.post_id),
  ]);
  if (data) {
    return res.send({ ...req.body, comment_id: data.insertId });
  }
  return res.status(404).send("ERROR ADDING POST");
});

router.put("/:commentId", async function (req, res, next) {
  const { error } = editSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Need To get content");
  }

  let data = await dbUtils.updateUserData(
    "comments",
    "content",
    req.body.content,
    req.body.user_id,
    req.params.commentId
  );
  if (data) {
    return res.send(data[1][0]);
  }
  return res.status(404).send("ERROR MODIFYING COMMENT");
});

router.delete("/:commentId", async function (req, res, next) {
  let data = await dbUtils.deleteUserData("comments", req.params.commentId);
  if (data) {
    return res.send({});
  }
  return res.status(404).send("ERROR DELETING COMMENT");
});

module.exports = router;
