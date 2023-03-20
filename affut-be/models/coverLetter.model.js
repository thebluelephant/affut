const sql = require("../db.js");

// constructor
const CoverLetter = function (coverLetter) {
    this.id = coverLetter.id;
    this.userId = coverLetter.userId;
    this.count = coverLetter.count
    // Date of the first cover letter generated. Reinitialize each month to propose a new count of 3
    this.countDateInit = coverLetter.countDateInit
};

CoverLetter.create = (userId, result) => {
    const newCoverLetter = {
        userId: userId,
        count: 1,
        count_date_init: new Date()
    }
    sql.query("INSERT INTO cover_letter SET ?", newCoverLetter, (err, res) => {
        if (err) {
            result({ success: false, data: err }, null);
            return;
        }
        result(null, { success: true, data: newCoverLetter });
    });
};

CoverLetter.getByUserId = (userId, result) => {
    sql.query(`SELECT * FROM cover_letter WHERE userId = ?`, userId, (err, res) => {
        if (err) {
            result({ success: false, data: err }, null);
            return;
        }

        if (res.length) {
            result(null, { success: true, data: res });
            return;
        }
        result(null, []);
    });
};

CoverLetter.getCountByUserId = (userId, result) => {
    sql.query(`SELECT count, count_date_init FROM cover_letter WHERE userId = ?`, userId, (err, res) => {
        if (err) {
            result({ success: false, data: err }, null);
            return
        }
        if (res.length) {
            result(null, { success: true, data: res[0] });
            return
        }
        result(null, null);
    });

};

CoverLetter.updateCountByUserId = (userId, newCount, newDate, result) => {
    sql.query(
        "UPDATE cover_letter SET count = ?, count_date_init = ? WHERE userId = ?",
        [newCount, newDate, userId],
        (err, res) => {
            if (err) {
                result({ success: false, data: err }, null);
                return;
            }
            if (res.changedRows) {
                result(null, { success: true, data: res.changedRows });
                return
            }
            result(null, []);
        }
    );
};

module.exports = CoverLetter;