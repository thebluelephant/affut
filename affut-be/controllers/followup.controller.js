const Followup = require("../models/followup.model.js");

// Create and Save a new followup
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Followup
    const followup = new Followup({
        company: req.body.company,
        applicationDate: req.body.applicationDate,
        jobName: req.body.jobName,
        announceUrl: req.body.announceUrl ?? null,
        status: req.body.status,
        userId: req.body.userId
    });

    // Save followup in the database
    Followup.create(followup, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the followup."
            });
        else res.send(data);
    });
};

// Find all followups attached to a user ID.
exports.findAllByUserId = (req, res) => {
    const userId = req?.params?.userId;
    Followup.findAllByUserId(userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving followups."
            });
        else res.send(data);
    });
};

// Update a followup identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Followup.updateById(
        req.params.id,
        new Followup(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found followup with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating followup with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a followup with the specified id in the request
exports.delete = (req, res) => {
    Followup.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found followup with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete followup with id " + req.params.id
                });
            }
        } else res.send({ message: `followup was deleted successfully!` });
    });

};

// Delete a followup with the specified id in the request
exports.deleteMultipleByIds = (req, res) => {

    req.body.ids.forEach(id => {
        Followup.remove(id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found followup with id ${id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete followup with id " + id
                    });
                }
            } else res.send({ message: `followup was deleted successfully!` });
        });
    })
};
