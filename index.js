const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());

connectDB();

app.use('/users', userRoutes);
// app.use('/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
