const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// Setup Razorpay instance
const instance = new Razorpay({
  key_id:  "rzp_live_SEWEPVd2enHCNX",
  key_secret: "C1td1IYsKskwIBWl8nrDTuLu",
});

// Route: POST /api/payment/razorpay
router.post('/razorpay', async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ success: false, message: "Amount is required" });
  }

  try {
    const order = await instance.orders.create({
      amount: amount * 100, // Razorpay takes amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
  }
});

module.exports = router;
