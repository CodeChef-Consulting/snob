import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import combinedRouter from './index';
import { createContext } from './context';

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for Next.js app
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// tRPC endpoint
app.use(
  '/trpc',
  createExpressMiddleware({
    router: combinedRouter,
    createContext,
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 tRPC API server running on http://localhost:${PORT}`);
  console.log(`📡 tRPC endpoint: http://localhost:${PORT}/trpc`);
});
