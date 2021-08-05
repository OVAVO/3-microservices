const db = require("../lib/database");
const Domain = db.domains;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  //if (!req.body.domainname) {
  //  res.status(400).send({ message: "Content can not be empty!" });
  //  return;
  //}

  // Create a Tutorial
  const domain = new Domain({
    domainname: req.body.domainname
  });

  // Save Tutorial in the database
  domain
    .save(domain)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the domain."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const domainname = req.query.domainname;
  var condition = domainname ? { domainname: { $regex: new RegExp(domainname), $options: "i" } } : {};

  Domain.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Domain.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Domain.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Domain with id=${id}. Maybe Domain was not found!`
        });
      } else res.send({ message: "Domain was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Domain with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Domain.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Domain with id=${id}. Maybe Domain was not found!`
        });
      } else {
        res.send({
          message: "Domain was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Domain with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Domain.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Domain.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving domains."
      });
    });
};