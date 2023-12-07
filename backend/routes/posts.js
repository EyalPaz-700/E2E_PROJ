var express = require("express");
var router = express.Router();
var Joi = require("joi");
var dbUtils = require("../../db/dbUtils");

const querySchema = Joi.object({
  from: Joi.number().required(),
  to: Joi.number().required(),
});

const editSchema = Joi.object({
  content: Joi.string(),
  title: Joi.string(),
}).xor("content", "title");

const schema = Joi.object({
  content: Joi.string().required(),
  title: Joi.string().required(),
});

router.head("/", async function (req, res, next) {
  let data = await dbUtils.getRecordCount("posts");
  if (data) {
    console.log(JSON.stringify({ post_count: data[0]["COUNT(*)"] }));
    res.set("post_count", data[0]["COUNT(*)"]);
    res.setHeader("Access-Control-Expose-Headers", "post_count");
    res.end();
  }
  return res.status(404).end();
});

router.get("/", async function (req, res, next) {
  const { error: queryError } = querySchema.validate(req.query);
  if (queryError) {
    return res.status(400).json({ error: queryError.details[0].message });
  }
  const { from, to } = req.query;
  let data = await dbUtils.getTableRange("posts", from, to);
  if (data) {
    return res.send(data);
  }
  return res.status(404).send("ERROR READING DATA");
});

router.post("/:user_id", async function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Schema");
  }
  let data = await dbUtils.postUserData("posts", [
    parseInt(req.params.user_id),
    req.body.title,
    req.body.content,
  ]);
  if (data) {
    return res.send({ ...req.body, post_id: data.insertId });
  }
  return res.status(404).send("ERROR ADDING POST");
});

router.put("/:user_id/:post_id", async function (req, res, next) {
  const { error } = editSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Schema");
  }
  let data = await dbUtils.updateUserData(
    "posts",
    Object.keys(req.body)[0],
    Object.values(req.body)[0],
    req.params.user_id,
    req.params.post_id
  );
  if (data) {
    return res.send(data[1][0]);
  }
  return res.status(404).send("ERROR MODIFYING POST");
});

router.get("/:postId", async function (req, res, next) {
  let data = await dbUtils.getAllResourceData(req.params.postId);
  if (data) {
    console.log(data);
    return res.send(data);
  }
  return res.status(404).send("ERROR READING POST DATA");
});

router.delete("/:postId", async function (req, res, next) {
  let data = await dbUtils.deleteUserData("posts", req.params.postId);
  if (data) {
    return res.send({});
  }
  return res.status(404).send("ERROR DELETING POST");
});
module.exports = router;
