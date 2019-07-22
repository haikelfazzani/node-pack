const connection = require("./database");
const libraries = {
  table: "node_libraries",
  id: "id",
  libraryName: "library_name",
  description: "description",
  links: "links",
  contributor: "contributor",
  category: "category",
  details: "details",
  keywords: "keywords",
  version: "version"
};


function addLibrary(libName, description, links, category, details, keywords, version, resolve) {

  const sql = `insert into ${libraries.table}(
    ${libraries.libraryName},
    ${libraries.description},
    ${libraries.links},
    ${libraries.category},
    ${libraries.details},
    ${libraries.keywords},
    ${libraries.version}
  ) 
  VALUES('${libName}', 
  '${description}', '${links}',  '${category}', '${details}' , '${keywords}' , '${version}' 
  )`;

  connection.query(sql, function (err, rows) {
    resolve({ err, result: rows });
  });

}

function deleteLibrary(resolve) { }

function getLibrary(libraryName, resolve) {


  const sql = `select * from ${libraries.table}
  where ${libraries.libraryName} = ${libraryName}`;

  connection.query(sql, function (err, rows) {
    resolve({ err, result: rows[0] });
  });
}

function getLibraries(resolve) {

  const sql = `select * from ${libraries.table}`;

  connection.query(sql, function (err, rows, fields) {
    resolve({ err, result: rows });
  });
}


module.exports = { addLibrary, getLibrary, getLibraries };
