import React from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { STRIPE_PUBLISHABLE_API_KEY } from "./constants";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_API_KEY);

const Payment = () => {
  const toast = useToast();
  const location = useLocation();
  const { amount } = location.state;
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }
    try {
      const { data } = await axios.post("payment", {
        amount,
      });
      console.log("data", data);
      console.log("cardElement", cardElement);

      const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      console.log("paymentREsult", paymentResult);
      if (paymentResult.error) {
        toast({
          title: "Payment Error",
          description: paymentResult.error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        if (paymentResult.paymentIntent?.status === "succeeded") {
          toast({
            title: "Payment Successful",
            description: "Your payment was processed successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        navigate("shop");
      }
    } catch (error) {
      console.error("Error processing payment:", error);

      toast({
        title: "Error",
        description:
          "An error occurred while processing the payment. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={10} mx="auto" maxWidth="400px">
      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <form>
          <Box mb={4}>
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </Box>
          <Button onClick={handlePayment} colorScheme="blue" size="lg">
            Click to Complete Payment
          </Button>
        </form>
      </Box>
    </Box>
  );
};

const PaymentWithElements = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentWithElements;
