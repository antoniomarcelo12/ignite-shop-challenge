import Stripe from "stripe";

const secret_key = process.env.STRIPE_SECRET_API_KEY || ''

export const stripe = new Stripe(secret_key, {
    apiVersion: '2023-10-16',
    appInfo: {
        name: 'Ignite Shop'
    }
})