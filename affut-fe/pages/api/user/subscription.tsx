import { Subscription } from "../../../services/typing/subscription.interface";

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_ID);

export default async function handler(req: { method: string; body: { stripeUserId : string }; }, res) {
  switch (req.method) {
    // Get subscribed products name for a given user stripeId
    case 'POST':
      try {
        const subscriptionByUser = await stripe.subscriptions.list({
          customer: req.body.stripeUserId,
        });
        let subscriptions : Subscription[] = [] 
        // We filter subscriptions to keep only ones that are active aka. not canceled 
        subscriptionByUser.data.forEach((sub: { items: { data: any; }; }) => { 
          const validStatus = ['active', 'trialing', 'past_due'] 
          if (validStatus.includes(sub.status)) { subscriptions.push(sub.items.data)} 
        })
        // For each subscription, we get the product name
        const products : string[] = [].concat(...subscriptions).map((product) => product.plan.product)

        // And because user can only have one subscription at a time, we only return the string value of the first element of th array
        res.status(200).send(products[0]);
      }
      catch (error) {
        res.send(error);
        res.status(405).end();
      }
      break;
      
  }
}
