// import {createRequire } from 'module';
// import Subscription from '../models/subscription.model';
// const require = createRequire(import.meta.url);

// const{ serve} = require('@upstash/workflow/express');

// export const sendReminder = serve (async (req , res, next)=> {
//     const {subscriptionId} = context.requestPayload;
//     const subscription = await fetchSubscription( context,subscriptionId);
// }); 

// const fetchSubscription = async (context, subscriptionId) =>{
//         return await context.run('get Subscription', ()=> {
//             return Subscription.findById(subscriptionId).populate('user','name email');
//         });
//     }

