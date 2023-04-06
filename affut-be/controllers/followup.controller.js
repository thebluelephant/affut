const Followup = require("../models/followup.model.js");
const { getUserSubscription } = require("./user.controller");


/**
 * Create a follow up 
 * NB :  A user that doesnt have an unlimited access to follow ups and has at least 5 followups can't creates one anymore
 */
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const { followup, stripeId } = req.body
    const subscription = await getUserSubscription(stripeId)

    if (!subscription) {
        // Check number of existing followup of the user
        const userNumberOfFollowUps = await new Promise((resolve) => Followup.findAllByUserId(followup.userId, false, (err, data) => {
            if (err)
                res.status(500).resolve({
                    message:
                        err.message || "Some error occurred while retrieving followups."
                });
            else resolve(data);
        })).then((res) => res.length)

        if (userNumberOfFollowUps >= 5) {
            res.send({ success: false, data: "You reached your follow ups limit, upgadre your plan to access unlimited access" })
        }
    }

    // Create a Followup
    const newFollowup = new Followup({
        company: followup.company,
        applicationDate: followup.applicationDate,
        jobName: followup.jobName,
        announceUrl: followup.announceUrl ?? null,
        status: followup.status,
        userId: followup.userId
    });

    // Save followup in the database
    Followup.create(newFollowup, (err, data) => {
        if (err) res.send({ success: false, data: err.message })
        else res.send({ success: true, data });
    });
};

/**
 * Find all followups attached to a user ID.
 * NB : A user that doesnt have an unlimited access will see only his 5 older followups
 */
exports.findAllByUserId = (req, res) => {
    const userId = req?.params?.userId;
    const stripeId = req?.query?.stripeid
    const canAccessUnlimitedFollowups = !!stripeId ?? false

    Followup.findAllByUserId(userId, canAccessUnlimitedFollowups, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving followups."
            });
        else res.send(data);
    });
};

// Has user already candidates to an offer with same job name and company
exports.hasUserAlreadyCandidates = (req, res) => {
    const userId = req.body.userId
    const company = req.body.company
    const jobName = req.body.jobName;

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Followup.findFollowupSumupByUserId(company, jobName, userId, (err, data) => {
        if (err && err.length) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sum ups."
            });
        } else if (data) {
            res.send(true)
        } else res.send(false)
    });
}

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
