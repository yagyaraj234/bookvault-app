import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <p className="md:text-3xl text-xl text-gray-100">
        {" "}
        Thank you for placing order with us.
      </p>
      <ul className="flex flex-col items-center">
        <li>You will receive your order with 3-5 days.</li>
        <li>Ebooks will be sent to your mail within 20 minutes</li>
      </ul>
    </div>
  );
};

export default PaymentSuccess;
