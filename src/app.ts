import express from 'express';
import cors from 'cors';
import router from './routers';
import globalErrorHandler from './middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
const app = express();

// parser

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// application routes
app.use('/api/v1', router)



// global error 
app.use(globalErrorHandler)

export default app;
