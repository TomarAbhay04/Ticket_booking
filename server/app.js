// import express from 'express';
// import path from 'path';
// import cors from 'cors';
// import paymentRoute from './routes/paymentRoutes.js';
// import movieInfo from './routes/movieInfo.js';
// import { get } from 'http';

// const app = express();
// const __dirname = path.resolve(); // Get absolute path for reliability

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

// // ... Middleware
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from this origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//   credentials: true, // Allow credentials
// }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace '*' with your actual frontend URL
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//   if (req.method === 'OPTIONS') {
//     res.sendStatus(204);
//   } else {
//     next();
//   }
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // ... Routes
// app.use('/api', paymentRoute);

// app.use('/', movieInfo);

// app.get('/api/getkey', (req, res) => {
//   res.status(200).json({
//     key: process.env.RAZORPAY_API_KEY 
//   })
// });

// // ... (Rest of your logic)

// export default app;

import express from 'express';
import path from 'path';
import cors from 'cors';
import paymentRoute from './routes/paymentRoutes.js';
import movieInfo from './routes/movieInfo.js';
import { get } from 'http';

const app = express();
const __dirname = path.resolve(); // Get absolute path for reliability

app.get('/', (req, res) => {
  res.send('Server is ready');
});

// ... Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ... Routes
app.use('/api', paymentRoute);

app.use('/', movieInfo);

app.get('/api/getkey', (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY 
  })
});

// ... (Rest of your logic)

export default app;