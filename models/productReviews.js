const  mongoose  = require("mongoose");


const productReviewsSchema = mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true,
        default:""
    },
    customerRatings:{
        type:Number,
        required:true,
        default:1
    },
    dateCreated:{
        type:Date,
        default: Date.now,
        
    }
})

productReviewsSchema.virtual('id').get(function (){
    return this._id.toHexString();
});

productReviewsSchema.set('toJSON', {
    virtuals: true,
})

exports.Reviews = mongoose.model('Reviews', productReviewsSchema);
exports.productReviewsSchema = productReviewsSchema;