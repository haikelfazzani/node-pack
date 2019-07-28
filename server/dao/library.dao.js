const connection = require("./database");
var SqlString = require('sqlstring');

const libraries = {
  table: "node_libraries",
  id: "id",
  packageName: "package",
  link: "link",
  details: "details",
  category: "category"
};


function addLibrary(packageName, link, details, category, resolve) {

  const sql = `insert into ${libraries.table}(
    ${libraries.packageName}, ${libraries.link}, ${libraries.details}, ${libraries.category}
  ) 
  VALUES( ? , ? , ? ,  ? )`;

  const sqlEs = SqlString.format(sql, [packageName, link, details, category]);

  connection.query(sqlEs, function (err, rows) {
    resolve({
      err: err ? `Sorry, the ${packageName} already exits!` : "",
      result: err ? "" : "Successful submit :) !"
    });
  });

}

function deleteLibrary(resolve) { }

function getLibrary(libraryName, resolve) {


  const sql = `select * from ${libraries.table} where ${libraries.libraryName} = ${libraryName}`;

  connection.query(sql, function (err, rows) {
    resolve({ err, result: rows[0] });
  });
}

function getLibraries(resolve) {

  const sql = `select * from ${libraries.table}`;

  connection.query(sql, function (err, rows, fields) {
    resolve({
      err: err ? "no data found" : "",
      result: err ? [] : rows
    });
  });
}


module.exports = { addLibrary, getLibrary, getLibraries };
