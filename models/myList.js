const  mongoose  = require("mongoose");


const wishListSchema = mongoose.Schema({
    productTitle:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    productId: {
        type:String,
        required:true
    },
    userId: {
        type:String,
        required:true
    }
})

wishListSchema.virtual('id').get(function (){
    return this._id.toHexString();
});

wishListSchema.set('toJSON', {
    virtuals: true,
})

exports.MyWishList = mongoose.model('MyWishList', wishListSchema);
exports.wishListSchema = wishListSchema;