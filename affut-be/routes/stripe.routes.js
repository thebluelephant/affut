// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const user = require('../controllers/user.controller')
const express = require('express');

module.exports = app => {
    const YOUR_DOMAIN = process.env.STRIPE_LOCAL_DOMAIN;
    const router = require("express").Router();
    router.patch("/user-metadata", async (req, res) => {
        const checkoutSession = await stripe.checkout.sessions.retrieve(req.body.stripeSessionId);
        const patchedUser = await user.patchUserMetadataWithStripeId(req.body.authUserId, checkoutSession.customer)
        res.end(JSON.stringify(patchedUser.data))
    });

    router.post('/create-checkout-session', async (req, res) => {
        const prices = await stripe.prices.list({
            lookup_keys: [req.body.lookup_key],
            expand: ['data.product'],
        });
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: prices.data[0].id,
                    quantity: 1,
                },
            ],
            client_reference_id: req.body.authUserId,
            mode: 'subscription',
            success_url: `${YOUR_DOMAIN}/home?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/home`,
        });
        res.send(session)
    });

    router.post('/create-portal-session', async (req, res) => {
        // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
        // Typically this is stored alongside the authenticated user in your database.
        const { session_id } = req.body;
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
        const returnUrl = `${YOUR_DOMAIN}/home`;

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: checkoutSession.customer,
            return_url: returnUrl,
        });
        res.send(portalSession.url)
    });

    router.post(
        '/webhook',
        express.raw({ type: 'application/json' }),
        (request, response) => {
            let event = request.body;
            const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
            if (endpointSecret) {
                // Get the signature sent by Stripe
                const signature = request.headers['stripe-signature'];
                try {
                    event = stripe.webhooks.constructEvent(
                        request.body,
                        signature,
                        endpointSecret
                    );
                } catch (err) {
                    console.log(`⚠️  Webhook signature verification failed.`, err.message);
                    return response.sendStatus(400);
                }
            }
            let subscription;
            let status;
            // Handle the event
            switch (event.type) {
                case 'customer.subscription.trial_will_end':
                    subscription = event.data.object;
                    status = subscription.status;
                    console.log(`Subscription status is ${status}.`);
                    // Then define and call a method to handle the subscription trial ending.
                    // handleSubscriptionTrialEnding(subscription);
                    break;
                case 'customer.subscription.deleted':
                    subscription = event.data.object;
                    status = subscription.status;
                    console.log(`Subscription status is ${status}.`);
                    // Then define and call a method to handle the subscription deleted.
                    // handleSubscriptionDeleted(subscriptionDeleted);
                    break;
                case 'customer.subscription.created':
                    subscription = event.data.object;
                    status = subscription.status;
                    console.log(`Subscription status is ${status}.`);
                    // Then define and call a method to handle the subscription created.
                    // handleSubscriptionCreated(subscription);
                    break;
                case 'customer.subscription.updated':
                    subscription = event.data.object;
                    status = subscription.status;
                    console.log(`Subscription status is ${status}.`);
                    // Then define and call a method to handle the subscription update.
                    // handleSubscriptionUpdated(subscription);
                    break;
                default:
                    // Unexpected event type
                    console.log(`Unhandled event type ${event.type}.`);
            }
            // Return a 200 response to acknowledge receipt of the event
            response.send();
        }
    )
    app.use('/api/stripe', router)
}