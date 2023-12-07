const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "FINAL_PROJ",
  multipleStatements: true,
});

const todoValues = "(user_id, content)";
const postValues = "(user_id, title, content)";
const commentValues = "(user_id, content, post_id)";

function executeQuery(sql, values = []) {
  return new Promise((resolve, reject) => {
    con.query(sql, [values], function (err, result) {
      console.log(sql);
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getUserData(table, userId) {
  const sql = `SELECT * FROM FINAL_PROJ.${table} WHERE user_id = ${parseInt(
    userId
  )}`;
  return executeQuery(sql);
}

//we can write it in one function (in getUserData)
function getSortedUserData(table, userId, sortField) {
  //sortField should be id/content
  const sql = `SELECT * FROM FINAL_PROJ.${table}
  WHERE user_id = ${parseInt(userId)} 
  ORDER BY ${sortField}`;
  return executeQuery(sql);
}

function getTableRange(table, from, to) {
  const sql = `
  SELECT psts.id as post_id, psts.user_id, psts.title, usrs.id as user_id, usrs.username FROM FINAL_PROJ.${table} psts
  JOIN FINAL_PROJ.users  usrs on psts.user_id = usrs.id
  LIMIT ${to} OFFSET ${from - 1} ;`;
  return executeQuery(sql);
}

function postUserData(table, values) {
  const insertValues =
    table === "todos"
      ? todoValues
      : table === "posts"
      ? postValues
      : commentValues;
  const sql = `INSERT INTO FINAL_PROJ.${table} ${insertValues} VALUES (?) `;
  return executeQuery(sql, values);
}

function updateUserData(table, field, value, userId, resourceId) {
  const sql = `UPDATE ${table}
               SET ${field} = ${
    typeof value === "string" ? `'${value}'` : value
  }
               WHERE user_id = ${userId} AND id = ${resourceId};
               SELECT * from ${table} WHERE id = ${resourceId};`;
  return executeQuery(sql);
}

function deleteUserData(table, resourceId) {
  const sql = `DELETE FROM ${table} WHERE id = ${parseInt(resourceId)}`;
  return executeQuery(sql);
}

function getUser(body) {
  const sql = `
  SELECT username, user_id FROM FINAL_PROJ.users usrs
  JOIN FINAL_PROJ.user_password pswrds
  ON usrs.id = pswrds.user_id
  WHERE usrs.username = '${body.username}' AND pswrds.password = '${body.password}'`;
  return executeQuery(sql);
}

function getAllResourceData(postId) {
  const sql = `SELECT 
  cmnts.id AS comment_id, 
  cmnts.content AS comment_content, 
  cmnts.post_id, 
  psts.content AS post_content, 
  psts.title AS post_title, 
  usrs.id AS user_id, 
  usrs.username 
FROM 
  FINAL_PROJ.posts psts
LEFT JOIN 
  FINAL_PROJ.comments cmnts ON psts.id = cmnts.post_id
LEFT JOIN 
  FINAL_PROJ.users usrs ON cmnts.user_id = usrs.id 
  WHERE psts.id = ${postId};
  `;
  return executeQuery(sql);
}

function getRecordCount(table) {
  const sql = `
      SELECT COUNT(*) 
      FROM FINAL_PROJ.${table};
`;
  return executeQuery(sql);
}
module.exports = {
  executeQuery,
  getUserData,
  getSortedUserData,
  postUserData,
  updateUserData,
  deleteUserData,
  getUser,
  getRecordCount,
  getTableRange,
  getAllResourceData,
};
