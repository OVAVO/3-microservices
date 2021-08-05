module.exports = app => {
    const domains = require("../controllers/domain");
  
    var router = require("express").Router();
  
    // Create a new Domain
    router.post("/", domains.create);
  
    // Retrieve all Domains
    router.get("/", domains.findAll);
  
    // Retrieve all published Domains
    router.get("/published", domains.findAllPublished);
  
    // Retrieve a single Domain with id
    router.get("/:id", domains.findOne);
  
    // Update a Domain with id
    router.put("/:id", domains.update);
  
    // Delete a Domain with id
    router.delete("/:id", domains.delete);
  
    // Create a new Domain
    router.delete("/", domains.deleteAll);
  
    app.use("/domains", router);
  };