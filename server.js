const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);


app.get('/', (req, res) => {
    console.log('👋 Root route hit');
    res.send('Hello from backend!');
  });
  
