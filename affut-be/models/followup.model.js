const sql = require("../db.js");

// constructor
const Followup = function (followup) {
    this.id = followup.id;
    this.company = followup.company;
    this.applicationDate = followup.applicationDate;
    this.jobName = followup.jobName;
    this.announceUrl = followup.announceUrl;
    this.status = followup.status;
    this.userId = followup.userId;
};

Followup.create = (newFollowup, result) => {
    sql.query("INSERT INTO followup SET ?", newFollowup, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created followup: ", { id: res.insertId, ...newFollowup });
        result(null, { id: res.insertId, ...newFollowup });
    });
};

Followup.findAllByUserId = (userId, result) => {
    sql.query(`SELECT * FROM followup WHERE userId = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found followup: ", res);
            result(null, res);
            return;
        }

        // not found Followup with the id
        result({ kind: "not_found" }, null);
    });
};


Followup.updateById = (id, followup, result) => {
    sql.query(
        "UPDATE followup SET company = ?, applicationDate = ?, jobName = ?, announceUrl = ?, status = ? WHERE id = ?",
        [followup.company, followup.applicationDate, followup.jobName, followup.announceUrl, followup.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found followup with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated followup: ", { id: id, ...followup });
            result(null, { id: id, ...followup });
        }
    );
};

Followup.remove = (id, result) => {
    sql.query("DELETE FROM followup WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Followup with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted followup with id: ", id);
        result(null, res);
    });
};


module.exports = Followup;