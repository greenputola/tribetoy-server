const  mongoose  = require("mongoose");


const orderSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    products:[

        {   
            productId:{
                type: String
            },
            productName:{
                type:String,
            },
            quantity:{
                type:Number,
            },
            price:{
                type:Number,
            },
            image:{
                type:String,
            },
            total:{
                type:Number,
            },
       
        }
    ],

    status: {
        type: String,
        default: "pending"
    },
    
    date:{
        type:Date,
        default: Date.now,
    },

    
})

orderSchema.virtual('id').get(function (){
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
})

exports.Orders = mongoose.model('Orders', orderSchema);
exports.orderSchema = orderSchema;