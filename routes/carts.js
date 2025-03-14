const { Cart } = require('../models/cart')
const express = require('express');
const router = express.Router();



router.get(`/`, async(req, res) =>{
    try{
        
        const cartList = await Cart.find(req.query);
            
        if(!cartList){
            res.status(500).json({ success: false})
        }   
        
        return res.status(200).json(cartList)

    }catch(error){
        res.status(500).json({ success: false})
    }
    });
    

router.post(`/add`, async (req, res) => {
    const cartItem = await Cart.find({productId: req.body.productId});

    if(cartItem.length===0){
        let  cartList = new Cart({
            productTitle: req.body.productTitle,
            image: req.body.image,
            rating: req.body.rating,
            price: req.body.price,
            quantity: req.body.quantity,
            total: req.body.total,
            productId: req.body.productId,
            userId: req.body.userId,
        
            });
    
            if(!cartList){
                res.status(505).json({
                    error: err,
                    success: false
                })
            }
    
            cartList = await cartList.save()
    
            res.status(201).json(cartList)
    }else{
        res.status(401).json({status:false, msg:"Product already added in the cart"})
    }
});

router.delete('/:id', async(req, res) =>{
        try {
            // Step 1: Find the cart by ID
            const cartItem = await Cart.findById(req.params.id);
            if (!cartItem) {
                // If the cart is not found, return a 404 response
                return res.status(404).json({
                    message: 'Cart item id is not found!',
                    success: false
                });
            }
    
            
            const deleteCartItem = await Cart.findByIdAndDelete(req.params.id);
            if (!deleteCartItem) {
                // If the cart could not be deleted, send an error response
                return res.status(400).json({
                    message: 'The Cart item could not be deleted.',
                    success: false
                });
            }
    
            // Step 4: Send a success response
            return res.status(200).json({
                success: true,
                message: 'The cart item is Deleted!'
            });
        } catch (error) {
            // Catch and log any errors
            console.error('Error deleting cart item:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while deleting the cart item.'
            });
        }
    });


router.put('/:id', async(req, res) =>{


        const cartList = await Cart.findByIdAndUpdate(
            req.params.id,
            {
            
                productTitle: req.body.productTitle,
                image: req.body.image,
                rating: req.body.rating,
                price: req.body.price,
                quantity: req.body.quantity,
                total: req.body.total,
                productId: req.body.productId,
                userId: req.body.userId,
        
            },
            {new:true}
        )

        if(!cartList) {
            return res.status(500).json({
                message: 'Cart item cannot be updated!',
                success: false
            })
        }

        res.send(cartList);
})





module.exports = router;