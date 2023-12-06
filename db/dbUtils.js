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

function executeQuery(sql, values = []) {
  return new Promise((resolve, reject) => {
    con.query(sql, [values], function (err, result) {
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

function getTableRange(table, from, to) {
  const sql = `
  SELECT * FROM FINAL_PROJ.${table} psts
  WHERE psts.id BETWEEN ${from} AND ${to};`;
  return executeQuery(sql);
}

function postUserData(table, values) {
  const insertValues = table === "todos" ? todoValues : postValues;
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

function getUser(body) {
  const sql = `
  SELECT username, user_id FROM FINAL_PROJ.users usrs
  JOIN FINAL_PROJ.user_password pswrds
  ON usrs.id = pswrds.user_id
  WHERE usrs.username = '${body.username}' AND pswrds.password = '${body.password}'`;
  return executeQuery(sql);
}

function getAllResourceData(postId) {
  const sql = `SELECT cmnts.id as comment_id, cmnts.content as comment_content, cmnts.post_id, psts.content as post_content, psts.title as post_title, usrs.id as user_id, usrs.username FROM FINAL_PROJ.comments cmnts
  JOIN FINAL_PROJ.posts psts
  ON psts.id = cmnts.post_id
  JOIN FINAL_PROJ.users usrs
  ON cmnts.user_id = usrs.id
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
  postUserData,
  updateUserData,
  getUser,
  getRecordCount,
  getTableRange,
  getAllResourceData,
};
