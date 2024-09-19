'use client'
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../form/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


export default function Stripe() {
    const [clientSecret, setClientSecret] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const amount = 10000;
    
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ id: "xl-tshirt" }], amount: amount },),
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret);
            // [DEV] For demo purposes only
          });
      }, []);
      
      const appearance = {
        theme: 'stripe' as 'stripe' | 'night' | 'flat',
      };
      const options = {
        clientSecret,
        appearance,
      };

  return (
    <div className="stripe">
    {clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        { <CheckoutForm amount={amount}/>}
      </Elements>
    )}
  </div>
  )
}
