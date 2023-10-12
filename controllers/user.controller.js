const db = require("../models");
const Genome = db.genome;
const Role = db.role;
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.showAllUser = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndRemove(userId, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete gene with id=${_id}.`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete genome with id=" + userId,
      });
    });
};

exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const user_id = req.params.id;

  User.findByIdAndUpdate(user_id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update genome with gen_id = ${user_id}.`,
        });
      } else res.send({ message: "Genome was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating genome with gen_id = " + user_id,
      });
    });
};
