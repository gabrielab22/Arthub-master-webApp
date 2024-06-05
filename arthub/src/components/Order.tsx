import React from "react";

interface OrderProps {
  totalPrice: number;
}

const Order: React.FC<OrderProps> = ({ totalPrice }) => {
  console.log(totalPrice, "total");
  return (
    <div>
      <h2>Your Order Summary</h2>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default Order;
