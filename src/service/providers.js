const modeDev = false;

const serverEndPoints = {
  addPackage: modeDev ?
    "http://localhost:3000/node/add/library" :
    "https://best-of-server.herokuapp.com/node/add/library",

  getPackages: modeDev ?
    "http://localhost:3000/node/libraries" :
    "https://best-of-server.herokuapp.com/node/libraries",

  deletePackage: modeDev ?
    "http://localhost:3000/node/delete/package" :
    "https://best-of-server.herokuapp.com/node/delete/package"
}

const npmEndPoints = {
  npmSearch: "http://registry.npmjs.com/-/v1/search?text=koa&size=10",
  packageDetails: `https://api.npms.io/v2/package`,
  npmDownloads: "https://api.npmjs.org/downloads/point/last-week",
  npmDownloadsFromTo: "https://api.npmjs.org/downloads/range",
  minified: "https://flat.badgen.net/bundlephobia/min/"
}

// npmDownloadsFromTo : "https://api.npmjs.org/downloads/range/2014-01-03:2019-02-03/jquery"
export { serverEndPoints, npmEndPoints }