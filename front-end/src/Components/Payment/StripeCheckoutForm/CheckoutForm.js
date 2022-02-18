import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {useStripe,useElements,CardElement} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../../UtiFunctions/stripe";
import { createOrder, emptyUserCart } from "../../../UtiFunctions/utiUSer";









export default function CheckoutForm() {

  const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();

  const {user,cart} = useSelector(state => ({...state}))  

{/*------------------------ Function's main Loading state ------------------------*/}
    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);




  useEffect(() => 
  {
        createPaymentIntent(user?.token)
                    .then((res)=>{
                        console.log("create payment intent", res.data);
                        setClientSecret(res.data.clientSecret);
                    })



  }, [user]);






  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };









  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmCardPayment(clientSecret, 
      {payment_method: {card: elements.getElement(CardElement),
        billing_details: {name: e.target.name.value,},},}); 

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    //if (error.type === "card_error" || error.type === "validation_error") {
    //  setMessage(error.message);
    //} else {
    //  setMessage("An unexpected error occured.");
    //}

    

    if (payload.error) {
      setError(payload.error.message)
    } else {
        setSucceeded(true)
        createOrder(payload, user.token).then((res) => {
            console.log(res.data.ok)

        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          emptyUserCart(user.token);
    }})
    }

    setIsLoading(false);
  };









const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };






  

  return (
      <>
        <form id="payment-form" onSubmit={handleSubmit}>
        
        <CardElement id="card-element" options={cartStyle} onChange={handleChange}/>


        <button disabled={isLoading || !stripe || !elements} id="submit" class="StripeButton">
            <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : succeeded ? "Done" : "Pay now"}
            </span>
        </button>
        
        <br />
        {error && (<div className="card-error" role="alert">{error}</div>
        )}
        <br />
        
        {succeeded ? <p className="card-success"> Payment Successful</p> : ""}


        </form>
    </>
  );
}