import { instance } from "../server.js";
// import crypto from "crypto";
import {Payment} from "../models/paymentModel.js";


export const checkout = async (req, res) => {
  try {
    // console.log('checkout payload', req.body);
    if (!req.body.totalPayment || typeof req.body.totalPayment !== 'number' || isNaN(req.body.totalPayment)) {
      return res.status(400).json({
          success: false,
          error: 'Invalid totalPayment provided'
      });
  }
    const options = {
      // amount: Number(req.body.totalPayment * 100),
      amount: Number(req.body.totalPayment * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    console.log(order);
    
    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id } =
  req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;
console.log(body);

const newPayment = new Payment({
  razorpay_order_id,
  razorpay_payment_id,
  totalPayment: req.body.totalPayment,
  // Add other fields as needed
});

try {
  // Save the new Payment instance to the database
  const savedPayment = await newPayment.save();

  // Redirect to a success page or send a success response
  res.redirect(
    `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
  );
} catch (error) {
  // Log the error and send a failure response
  console.error('Error saving payment:', error);
  res.status(500).json({
    success: false,
    error: error.message,
  });
}

// const expectedSignature = crypto
//   .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
//   .update(body.toString())
//   .digest("hex");

//   // console.log(expectedSignature, razorpay_signature);

// const isAuthentic = expectedSignature === razorpay_signature;

// if (isAuthentic) {
//   // Database comes here

//   await Payment.create({
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//   });



  // res.redirect(
  //   `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
  // );

// } else {
//   res.status(400).json({
//     success: false,
//   });
// }  


  };

