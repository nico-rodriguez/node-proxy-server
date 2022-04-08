const cors = require('cors');
const rateLimit = require('express-rate-limit');
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window`
});
app.use(limiter);
app.set('trust proxy', 1);

// Cors
app.use(cors());

// Static folder
app.use(express.static('public'));

// Routes
app.use('/api', require('./routes/index.js'));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}!`));
