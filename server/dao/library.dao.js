const connection = require("./database");
const libraries = {
  table: "node_libraries",
  id: "id",
  package: "package",
  link: "link",
  details: "details",
  category: "category"
};


function addLibrary(package, link, details, category, resolve) {

  const sql = `insert into ${libraries.table}(
    ${libraries.package}, ${libraries.link}, ${libraries.details}, ${libraries.category}
  ) 
  VALUES( '${package}' , '${link}' ,'${details}' ,  '${category}' )`;

  connection.query(sql, function (err, rows) {
    resolve({
      err: err ? `Sorry, the ${package} already exits!` : "",
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
