'use client'
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import OrderApis from "../../_utils/OrderApis";
import { useUser } from "@clerk/nextjs";
import { useCartContext } from "../../_context/CartContext";
import CartApis from "../../_utils/CartApis";

const CheckoutForm = ({ amount }) => {
  const { user } = useUser();
  const { cart, setCart } = useCartContext();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };
    createOrder();
    sendEmail();
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount: amount }),
    });

    const clientSecret = await res.json();
    // Confirm the PaymentIntent using the details collected by the Payment Element
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirmed",
      },
    });
    if (result.error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      handleError(result.error);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const createOrder = () => {
    let productIds = [];
    cart.forEach((el) => {
      productIds.push(el?.product?.id);
    });
    const data = {
      data: {
        username: user.fullName,
        amount,
        products: productIds,
        email: user.primaryEmailAddress.emailAddress,
      },
    };
    OrderApis.createOrder(data)
      .then((res) => {
        if (res) {
          cart.forEach((el) => {
            CartApis.deleteCartItem(el?.id).catch((err) => console.log(err));
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        email: user.primaryEmailAddress.emailAddress,
        fullName: user.fullName,
      }),
    });
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-[450px] mx-auto mt-20">
      <PaymentElement />
      <button
        className="inline-block w-full px-12 py-3 mt-5 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        type="submit"
        disabled={!stripe || loading}
      >
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
