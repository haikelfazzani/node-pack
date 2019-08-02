const modeDev = false;

function addPackageMode() {
  //const prodLink = "http://best-of-server.openode.io/node/add/library";
  const zeit = "https://best-of-server.now.sh/node/add/library";
  const devLink = "http://localhost:3000/node/add/library";
  return modeDev ? devLink : zeit;
}

function getLibrariesMode() {
  //const prodLink = "http://best-of-server.openode.io/node/libraries";
  const zeit = "https://best-of-server.now.sh/node/libraries";
  const devLink = "http://localhost:3000/node/libraries";
  return modeDev ? devLink : zeit;
}

export { addPackageMode, getLibrariesMode };
