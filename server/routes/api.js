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

      axios.get(`http://registry.npmjs.com/-/v1/search?text=${libname}&size=10`)
        .then(acct => {

          let details = acct.data.objects
            .filter(o => link === o.package.links.repository)[0] || acct.data.objects[0];

          addLibrary(package, JSON.stringify(details), encodeURIComponent(catg), (resolve) => {
            res.status(200).json(resolve);
          });

        })
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
          p.category = decodeURIComponent(p.category)
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
