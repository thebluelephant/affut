const CoverLetter = require("../models/coverLetter.model");
const chat = require("../models/chatgpt.model");
const { getUserSubscription } = require("./user.controller");
const subscriptionPlans = require('../utils/subscription.utils');
const dayjs = require('dayjs')

exports.initialize = async (req, res) => {
    const userId = req?.params?.userId;
    CoverLetter.create(userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving coverLetters."
            });
        else res.send(data);
    });
}

exports.getByUserId = async (req, res) => {
    const userId = req?.params?.userId;
    CoverLetter.getCountByUserId(userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving coverLetters."
            });
        else res.send(data);
    });
}

exports.generateLetter = async (req, res) => {
    const userId = req?.params?.userId
    const stripeId = req?.params?.stripeId
    const { form } = req.body
    const subscription = await getUserSubscription(stripeId)

    // User can only generate letter if he's subscribed to premium plan
    if (subscription === subscriptionPlans.premiumSubscription) {
        assertUserCanGenerateLetter(userId).then((response) => {
            if (response.success) {
                return chat.askSomething(form).then((letter) => {
                    const data = {
                        ...letter,
                        count: response.data
                    }
                    res.send(data)
                })

            } else {
                return res.send(response)
            }
        })
    } else {
        res.send(({ success: false, data: "You must upgrade your plan to have access to this feature" }))
    }


}

assertUserCanGenerateLetter = async (userId) => {
    return new Promise((resolve) => CoverLetter.getCountByUserId(userId, (err, res) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving coverLetters."
            });
        else {
            const { data } = res
            const firstLetterOlderThan4weeks = dayjs(data.count_date_init).diff(new Date, 'weeks') >= 5
            if (firstLetterOlderThan4weeks === false && data.count >= 3) {
                return resolve({ success: false, data: "Count > 3 and/or not enough time since your first letter " })
            } else {
                return updateCount(userId, data).then(res => resolve(res))
            }
        }
    })).then((res) => res)
}

updateCount = async (userId, data) => {
    return new Promise((resolve) => {
        if (!data) {
            /**
            * If no count, it's the first time the user generates a letter so we create a cover_letter object 
            * in the table, initialized with count 1 and the date of today
            */
            return CoverLetter.create(userId, (error, data) => {
                if (error) console.error(error)
                if (data) return resolve(data)
            })
        } else {
            /**
             * If the user already has a cover_letter object, and the date of his first letter is older than
             * 4 weeks, we reset the date with today, and reset his count to 1 
             */
            if (dayjs(data.count_date_init).diff(new Date, 'weeks') > 4) {
                return CoverLetter.updateCountByUserId(userId, 1, new Date(), (error, data) => {
                    if (error) console.error(error)
                    if (data) resolve(data)
                })
            } else {
                /**
                 * If the date of his first cover letter is under 4 weeks, we just increment the count of 1
                 */
                return CoverLetter.updateCountByUserId(userId, data.count + 1, data.count_date_init, (error, data) => {
                    if (error) console.error(error)
                    if (data) resolve(data)
                })
            }
        }
    })

}

