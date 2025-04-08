const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
//const authJwt = require('./helper/jwt.js') //used for without token not be able to signin

// Global unhandled rejection handler
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
    // You can exit the process or handle the error accordingly
    process.exit(1); // Exit with failure code
});

app.use(cors());
app.options('*', cors());

// Middleware
app.use(bodyParser.json());
app.use(express.json());
//app.use(authJwt());

// Routes
const userRoutes = require('./routes/users.js')
const categoryRoutes = require('./routes/categories.js');
const productRoutes = require('./routes/products.js');
const { User } = require('./models/user.js');
const  cart  = require('./routes/carts.js');
const productReviews = require('./routes/productReview.js');
const myWishList = require('./routes/myList.js');
const search = require('./routes/search.js');
const orders = require('./routes/orders.js')
const shippingRoutes = require("./routes/shipping");
const paymentRoutes = require('./routes/payment');

app.use("/api/shipping", shippingRoutes);
// Static file serving
app.use("/uploads", express.static("uploads"));

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart',cart );
app.use('/api/reviews', productReviews);
app.use('/api/MyList', myWishList);
app.use('/api/Search', search);
app.use('/api/Orders', orders);
app.use('/api/payment', paymentRoutes);
// Serve static files (images) from 'public' folder
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Use database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database Connection is ready....');
    // Start server
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection failed:', err); // Enhanced error logging
    process.exit(1); // Exit with failure code if DB connection fails
});


