const modeDev = false;

function addPackageMode() {
  const prodLink = "https://node-pack.herokuapp.com/api/node/add/library";
  const devLink = "http://localhost:3001/api/node/add/library";
  return modeDev ? devLink : prodLink;
}

function getLibrariesMode() {
  const prodLink = "https://node-pack.herokuapp.com/api/node/libraries";
  const devLink = "http://localhost:3001/api/node/libraries";
  return modeDev ? devLink : prodLink;
}

export { addPackageMode, getLibrariesMode };
