const connection = require("./database");
const libraries = {
  table: "node_libraries",
  id: "id",
  package: "package",
  details: "details",
  category: "category"
};


function addLibrary(package, details, category, resolve) {

  const sql = `insert into ${libraries.table}(
    ${libraries.package},
    ${libraries.details},
    ${libraries.category}
  ) 
  VALUES('${package}', '${details}',''${category}' )`;

  connection.query(sql, function (err, rows) {
    resolve({
      err: err ? "your package already exist!" : "",
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
