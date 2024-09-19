'use client'
import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { any } from "zod";
import { Layout } from "@stripe/stripe-js";
import { Button } from "../ui/button";

  

export default function CheckoutForm({ amount }: any) {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/excel",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if(error){
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message as string);
          } else {
            setMessage("An unexpected error occurred.");
          }
      
          setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded, now redirect manually
        window.location.href = "http://localhost:3000/excel"; // Or use Next.js `router.push("/excel")` for better practice
    } else {
        setMessage("Payment could not be completed.");
        setIsLoading(false);
    }
    
    
  };

  const paymentElementOptions = {
    layout: "auto" as Layout,
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? 
            <Button disabled={true}>
                Processing...
            </Button>
        :   <Button>
                Pay {amount} THB
            </Button>}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: For demo purposes only, display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
        </p>
      </div>
    </>
  );
}