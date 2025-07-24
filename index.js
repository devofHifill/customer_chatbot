import express from 'express';
import chatRouter from './routes/chat.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express(); // ✅ Declare app BEFORE using it

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Serve static files

// ✅ Routes
app.use('/chat', chatRouter);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Chatbot server running at http://localhost:${PORT}`);
});
