const router = require("express").Router();
const axios = require('axios');

const { addLibrary, getLibrary, getLibraries } = require("../dao/library.dao");

router.post('/node/add/library', (req, res) => {
  setImmediate(() => {
    try {

      let { libname, link, category } = req.body;

      libname = (libname.trim()).toLowerCase();
      link = link.trim();
      let catg = (category.trim()).toLowerCase();

      axios.all([
        axios.get(`http://registry.npmjs.com/-/v1/search?text=${libname}&size=20`),
        axios.get("https://api.npmjs.org/downloads/point/last-week/express")
      ])
        .then(axios.spread(function (acct, perms) {

          let data = acct.data.objects.filter(o => link === o.package.links.repository)[0]
            || acct.data.objects[0];

          libname = data.package.name || libname;
          let links = JSON.stringify(data.package.links);
          let description = data.package.description;
          let details = JSON.stringify(data.score.detail);
          let keywords = JSON.stringify(data.package.keywords);
          let version = data.package.version;

          let downloads = JSON.stringify(perms.data) || 0;

          addLibrary(libname, description, links, catg, details, keywords, version, downloads,
            (resolve) => {
              res.status(200).json(resolve.result);
            });

        }))
        .catch(error => console.log(error));

    } catch (error) {
      res.status(400).json({ msg: 'error' });
    }
  });
});

router.get('/node/libraries', (req, res) => {
  setImmediate(() => {
    try {

      getLibraries(resolve => {
        res.json(resolve.result);
      });

    } catch (error) {
      res.status(400).send('error');
    }
  });
});

router.get("/node", (req, res) => {
  axios.all([
    axios.get(`http://registry.npmjs.com/-/v1/search?text=express&size=20`),
    axios.get("https://api.npmjs.org/downloads/point/last-week/express")
  ])
    .then(axios.spread(function (acct, perms) {
      console.log(acct.data)
      //console.log(perms.data)
    }))
    .catch(err => console.log(err))
  res.json("hello")
})

module.exports = router;
