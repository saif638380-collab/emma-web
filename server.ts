import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

interface ReaderMessage {
  id: string;
  name: string;
  inbox: string;
  message: string;
  createdAt: string;
}

const messagesStore: ReaderMessage[] = [];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function forwardToTelegramBot(data: { name: string; inbox?: string; message: string }) {
  const token = process.env.TELEGRAM_BOT_TOKEN || '8827568319:AAG05YK4Z9jTOBXXwzqYWAEtk7t-losgIs0';
  const text = `💌 <b>New Message for Emma!</b>\n\n👤 <b>From:</b> ${escapeHtml(data.name)}\n💬 <b>Message:</b>\n${escapeHtml(data.message)}\n\n⏰ <i>${new Date().toLocaleString()}</i>`;

  let chatId = process.env.TELEGRAM_CHAT_ID || '8514334720';

  if (!chatId) {
    try {
      const updatesRes = await fetch(`https://api.telegram.org/bot${token}/getUpdates`, {
        signal: AbortSignal.timeout(6000),
      });
      const updatesData = (await updatesRes.json()) as any;
      if (updatesData.ok && Array.isArray(updatesData.result) && updatesData.result.length > 0) {
        const rawIds: string[] = updatesData.result
          .map((u: any) => u.message?.chat?.id || u.channel_post?.chat?.id)
          .filter(Boolean)
          .map((id: any) => String(id));
        const chatIds: string[] = Array.from(new Set(rawIds));
        if (chatIds.length > 0) {
          chatId = chatIds[chatIds.length - 1];
        }
      }
    } catch (err) {
      console.error('Failed to get Telegram updates:', err);
    }
  }

  if (chatId) {
    try {
      const sendRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
        signal: AbortSignal.timeout(6000),
      });
      const sendData = await sendRes.json();
      console.log('Telegram message dispatch status:', sendData);
    } catch (err) {
      console.error('Failed to dispatch message to Telegram:', err);
    }
  } else {
    console.log('Bot message recorded. Note: Send /start to @SaifimtiazBot on Telegram to register your chat ID.');
  }
}

// API endpoint for reader messages to Emma
app.post('/api/message-emma', async (req, res) => {
  try {
    const { name, inbox, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }

    const newMessage: ReaderMessage = {
      id: Date.now().toString(),
      name: String(name).trim(),
      inbox: String(inbox || 'Not provided').trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    messagesStore.unshift(newMessage);
    if (messagesStore.length > 100) messagesStore.pop();

    forwardToTelegramBot(newMessage).catch((err) => {
      console.error('Error in background Telegram forward:', err);
    });

    return res.json({
      success: true,
      message: 'Emma will response you',
      details: 'You will get reply in inbox soon!',
    });
  } catch (error) {
    console.error('Error handling reader message:', error);
    return res.status(500).json({ error: 'Failed to process message' });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
