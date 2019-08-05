const modeDev = false;

const serverEndPoints = {
  addPackage: modeDev ?
    "http://localhost:3000/node/add/library" :
    "https://best-of-server.now.sh/node/add/library",
  getPackages: modeDev ?
    "http://localhost:3000/node/libraries" :
    "https://best-of-server.now.sh/node/libraries"
}

const npmEndPoints = {
  packageDetails: `https://api.npms.io/v2/package`,
  npmDownloads: "https://api.npmjs.org/downloads/point/last-week",
  npmDownloadsFromTo: "https://api.npmjs.org/downloads/range"
}

// npmDownloadsFromTo : "https://api.npmjs.org/downloads/range/2014-01-03:2019-02-03/jquery"

export { serverEndPoints, npmEndPoints };
