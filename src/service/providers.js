const modeDev = false;

function addPackageMode() {
  const prodLink = "http://best-of-server.openode.io/node/add/library";
  const devLink = "http://localhost:3000/node/add/library";
  return modeDev ? devLink : prodLink;
}

function getLibrariesMode() {
  const prodLink = "http://best-of-server.openode.io/node/libraries";
  const devLink = "http://localhost:3000/node/libraries";
  return modeDev ? devLink : prodLink;
}

export { addPackageMode, getLibrariesMode };
