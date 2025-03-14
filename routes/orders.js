const { Orders } = require('../models/order');
const express = require('express');
const router = express.Router();




router.get(`/`, async(req, res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const perPage = 15;
        const totalPosts = await Orders.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({ message: "Page not found"})
        }


        const orderList = await Orders.find()
            .skip((page-1) * perPage)
            .limit(perPage)
            .exec();

        if(!orderList){
            res.status(500).json({ success: false})
        }
    
        
        return res.status(200).json({
                "orderList":orderList,
                "totalPages":totalPages,
                "page":page
        })



    }catch(error){
        res.status(500).json({ success: false})
    }
    });
    
    
    

router.get('/:id', async(req, res) =>{
    const order = await Orders.findById(req.params.id);

    if(!order) {
        res.status(500).json({ message: 'The order given Id is not found.'})
    }
    return res.status(200).send(order);
})


router.post('/create', async (req, res) => {
    
   
     let  order = new Orders({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            zip: req.body.zip,
            amount: req.body.amount,
            paymentId: req.body.paymentId,
            email: req.body.email,
            userid: req.body.userid,
            products: req.body.products,           
            
        });

        if(!order){
            res.status(505).json({
                error: err,
                success: false
            })
        }

        order = await order.save()


            res.status(201).json(order)
        });

router.delete('/:id', async(req, res) =>{
        try {
            // Step 1: Find the product by ID
            const order = await Orders.findById(req.params.id);
            if (!order) {
                // If the product is not found, return a 404 response
                return res.status(404).json({
                    message: 'Order not found.',
                    success: false
                });
            }
    
            // Step 3: Delete the product from the database
            const deleteOrder = await Orders.findByIdAndDelete(req.params.id);
            if (!deleteOrder) {
                // If the product could not be deleted, send an error response
                return res.status(400).json({
                    message: 'The Order could not be deleted.',
                    success: false
                });
            }
    
            // Step 4: Send a success response
            return res.status(200).json({
                success: true,
                message: 'The Order is Deleted!'
            });
        } catch (error) {
            // Catch and log any errors
            console.error('Error deleting order:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while deleting the order.'
            });
        }
    });




module.exports = router;