'use client'
import { Suspense, useEffect, useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";

const apiKey = process.env.NEXT_PUBLIC_Publishable_key || "";
const stripePromise = loadStripe(apiKey);

function CheckoutPage() {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const parsedAmount = Number(searchParams.get("amount"));
    if (parsedAmount > 0) {
      setAmount(parsedAmount);
    }
  }, []);

  if (!amount) {
    return <div>Invalid amount provided. Please specify a valid amount in the URL query string.</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Elements stripe={stripePromise} options={{ mode: "payment", currency: "usd", amount: amount * 100 }}>
        <CheckoutForm amount={amount} />
      </Elements>
    </Suspense>
  );
}

export default CheckoutPage;
