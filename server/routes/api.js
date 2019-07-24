const router = require("express").Router();
const axios = require('axios');

const { addLibrary, getLibraries } = require("../dao/library.dao");

router.post('/node/add/library', (req, res) => {
  setImmediate(() => {
    try {

      let { libname, link, category } = req.body;

      const package = (libname.trim()).toLowerCase();
      link = link.trim();
      const catg = (category.trim()).toLowerCase();

      axios.all([
        axios.get(`http://registry.npmjs.com/-/v1/search?text=${libname}&size=10`),
        axios.get(`https://api.npmjs.org/downloads/point/last-week/${libname}`)
      ])
        .then(axios.spread(function (acct, perms) {

          let details = acct.data.objects
            .filter(o => link === o.package.links.repository)[0] || acct.data.objects[0];

          let downloads = JSON.stringify(perms.data) || 0;

          addLibrary(package, JSON.stringify(details), downloads, catg, (resolve) => {
            res.status(200).json(resolve);
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
        let packages = resolve.result;
        let parsePackges = [];

        packages.forEach(p => {
          p.details = JSON.parse(p.details);
          p.downloads = JSON.parse(p.downloads);
          parsePackges.push(p);
        });

        res.status(200).json(parsePackges);
      });

    } catch (error) {
      res.status(400).json({ msg: 'error' });
    }
  });
});


module.exports = router;
