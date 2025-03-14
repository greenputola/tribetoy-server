const { Reviews } =require('../models/productReviews.js')
const express = require('express');
const router = express.Router();

router.post(`/add`, async (req, res) => {
    try {
      let review = new Reviews({
        customerId: req.body.customerId,
        customerName: req.body.customerName,
        review: req.body.review,
        customerRatings: req.body.customerRatings,
        productId: req.body.productId,
      });
  
      // Attempt to save the review
      review = await review.save();
      
      return res.status(201).json(review); // Successfully saved review
    } catch (err) {
      console.error("Error saving review:", err);
      res.status(500).json({ success: false, message: "Failed to submit review" });
    }
  });

router.get(`/`, async(req, res) =>{
    let reviews = [];
    try{
        
        if(req.query.productId!==undefined && req.query.productId!==null && req.query.productId!==""){
            reviews = await Reviews.find({productId:req.query.productId });
        }else{
            reviews = await Reviews.find();
        }

        if(!reviews){
            res.status(500).json({ success: false})
        }
        return res.status(200).json(reviews);
        

    }catch(error){
        res.status(500).json({ success: false})
    }
    });
    
      

    router.get(`/:id`, async(req, res) =>{
        
        const review = await Reviews.findById(req.params.id);

        if(!review){
            res.status(500).json({message:"The review is not found"});
        }else{
            return res.status(200).send(review);
        }
        });
    





module.exports = router;