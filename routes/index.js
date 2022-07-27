const router = require("express").Router();
const apiRoutes = require("./api");
//top level for path
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("404 error look in index");
});

module.exports = router;