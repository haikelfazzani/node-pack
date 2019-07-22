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

      axios.get(`http://registry.npmjs.com/-/v1/search?text=${libname}&size=20`)
        .then(response => {

          let data = response.data.objects.filter(o => link === o.package.links.repository)[0]
            || response.data.objects[0];

          libname = data.package.name || libname;
          let links = JSON.stringify(data.package.links);
          let description = data.package.description;
          let details = JSON.stringify(data.score.detail);
          let keywords = JSON.stringify(data.package.keywords);
          let version = data.package.version;

          addLibrary(libname, description, links, catg, details, keywords, version, (resolve) => {
            res.status(200).json(resolve.result);
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
        res.json(resolve.result);
      });

    } catch (error) {
      res.status(400).send('error');
    }
  });
});

module.exports = router;
