import express from 'express';
import chatRouter from './routes/chat.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.use('/chat', chatRouter);

app.listen(3000, () => {
  console.log('Chatbot server running at http://localhost:3000');
});
