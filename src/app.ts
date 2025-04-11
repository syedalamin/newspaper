import express, { json } from 'express';
import cors from 'cors';
import router from './routers';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app = express();

// parser

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// application routes
app.use('/api/v1', router)



// global error 
app.use(globalErrorHandler)

export default app;
