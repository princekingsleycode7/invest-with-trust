import express from 'express';
import emailRouter from './send-email';
import chatRouter from './chat';

const app = express();

app.use(express.json());
app.use('/api/send-email', emailRouter);
app.use('/api/chat', chatRouter);

export default app;