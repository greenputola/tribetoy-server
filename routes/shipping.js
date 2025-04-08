const express = require("express");
const router = express.Router();

// Shipping charges based on the first three digits of the pincode
const shippingRates = {
  "18": 50, // Jammu & Kashmir
  "17": 45, // Himachal Pradesh
  "14": 40, // Punjab
  "16": 35, // Chandigarh
  "24": 40, // Uttarakhand
  "12": 30, // Haryana
  "11": 25, // Delhi
  "30": 50, // Rajasthan
  "20": 45, // Uttar Pradesh
  "80": 35, // Bihar
  "73": 40, // Sikkim
  "79": 50, // Arunachal Pradesh
  "79": 50, // Nagaland
  "79": 50, // Manipur
  "79": 50, // Mizoram
  "79": 50, // Tripura
  "79": 50, // Meghalaya
  "78": 30, // Assam
  "70": 25, // West Bengal
  "81": 40, // Jharkhand
  "75": 45, // Odisha
  "49": 50, // Chhattisgarh
  "45": 50, // Madhya Pradesh
  "36": 30, // Gujarat
  "36": 35, // Daman & Diu
  "39": 35, // Dadra & Nagar Haveli
  "40": 50, // Maharashtra
  "56": 30, // Karnataka
  "40": 45, // Goa
  "68": 50, // Lakshadweep
  "67": 30, // Kerala
  "60": 35, // Tamil Nadu
  "53": 40, // Puducherry
  "74": 50, // Andaman & Nicobar
  "50": 40, // Telangana
  "50": 40, // Andhra Pradesh
};

// API to get shipping charge based on pincode
router.get("/:pincode", (req, res) => {
  const { pincode } = req.params;
  if (!pincode || pincode.length < 2) {
    return res.status(400).json({ error: "Invalid Pincode" });
  }

  const prefix = pincode.substring(0, 2); // Extract first 3 digits

  if (shippingRates[prefix] !== undefined) {
    res.json({ shippingCharge: shippingRates[prefix] });
  } else {
    res.status(404).json({ error: "Shipping not available for this pincode." });
  }
});

module.exports = router;
