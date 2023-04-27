// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const user = require('../controllers/user.controller')
const express = require('express');

module.exports = app => {
    const YOUR_DOMAIN = process.env.STRIPE_LOCAL_DOMAIN;
    const router = require("express").Router();
    router.patch("/user-metadata", async (req, res) => {
        /**
         * 2 possibilities : 
         * - If we receive stripeSessionId: We fill Auth0 user metadata with User Stripe ID
         * - If stripeSessionId = null : it means the user doesnt have a subscription anymore, but his metadata are not 
         * updated, so we do it by deleting the stripeId from Auth0 user metadata
         */
        let checkoutSession
        if (req.body.stripeSessionId) {
            checkoutSession = await stripe.checkout.sessions.retrieve(req.body.stripeSessionId);
        }

        const patchedUser = await user.patchUserMetadataWithStripeId(req.body.authUserId, checkoutSession?.customer ?? null)
        res.end(JSON.stringify(patchedUser.data))
    });

    router.post('/create-checkout-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: req.body.subscription.line_items.price,
                    quantity: 1,
                },
            ],
            client_reference_id: req.body.authUserId,
            mode: 'subscription',
            success_url: `${YOUR_DOMAIN}/checkout?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/hello`,
        });
        res.send(session)
    });

    router.post('/create-portal-session', async (req, res) => {
        // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
        // Typically this is stored alongside the authenticated user in your database.
        const returnUrl = `${YOUR_DOMAIN}/checkout`;

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: req.body.userStripeId,
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