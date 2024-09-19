import { Currency } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest){
    try{
        const  { amount } = await req.json();
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'thb',
        })
        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        })
    } catch(error){
        console.log(error);
        return NextResponse.json({ message: "Something went wrong!"}, {status: 500});
    }
}