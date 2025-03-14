const { MyWishList } = require('../models/myList.js')
const express = require('express');
const router = express.Router();



router.get(`/`, async(req, res) =>{
    try{
        
        const myWishList = await MyWishList.find(req.query);
            
        if(!myWishList){
            res.status(500).json({ success: false})
        }   
        
        return res.status(200).json(myWishList)

    }catch(error){
        res.status(500).json({ success: false})
    }
    });
    

router.post(`/add`, async (req, res) => {
    const wishListItem = await MyWishList.find({productId: req.body.productId, userId: req.body.userId});

    if(wishListItem.length===0){
        let wishList = new MyWishList({
            productTitle: req.body.productTitle,
            image: req.body.image,
            rating: req.body.rating,
            price: req.body.price,
            productId: req.body.productId,
            userId: req.body.userId,
            });
    
            if(!wishList){
                res.status(505).json({
                    error: err,
                    success: false
                })
            }
    
            wishList = await wishList.save()
    
            res.status(201).json(wishList)
    }else{
        res.status(401).json({status:false, msg:"Product already added in the WishList"})
    }
});

router.delete('/:id', async(req, res) =>{
        try {
            // Step 1: Find the cart by ID
            const wishItem = await MyWishList.findById(req.params.id);
            if (!wishItem) {
                // If the cart is not found, return a 404 response
                return res.status(404).json({
                    message: 'Cart WishList id is not found!',
                    success: false
                });
            }
    
            
            const deleteWishListItem = await MyWishList.findByIdAndDelete(req.params.id);
            if (!deleteWishListItem) {
                // If the cart could not be deleted, send an error response
                return res.status(400).json({
                    message: 'The WishList item could not be deleted.',
                    success: false
                });
            }
    
            // Step 4: Send a success response
            return res.status(200).json({
                success: true,
                message: 'The WishList item is Deleted!'
            });
        } catch (error) {
            // Catch and log any errors
            console.error('Error deleting WishList item:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while deleting the WishList item.'
            });
        }
    });



module.exports = router;