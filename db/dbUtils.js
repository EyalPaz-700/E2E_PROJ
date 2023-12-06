const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "FINAL_PROJ",
  multipleStatements: true,
});

const todoValues = "(user_id, content)";

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

function postUserData(table, values) {
  const insertValues = todoValues;
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
module.exports = {
  executeQuery,
  getUserData,
  postUserData,
  updateUserData,
  getUser,
};
