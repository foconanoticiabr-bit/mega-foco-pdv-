import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://ppndqeqmvrsyjceygejg.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbmRxZXFtdnJzeWpjZXlnamVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTgyNTcsImV4cCI6MjA5Mjc5NDI1N30.mlHV75k4YD4BTyhn2wz6sclZVhWy1m2GrKKpZ8GS6hk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'e90ed24d-f93a-4543-ba26-0a4276f76bcb' 
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post('/api/create-preference', async (req, res) => {
    try {
      const { planName, price, userEmail } = req.body;

      // Log the intent in Supabase
      await supabase.from('checkout_attempts').insert([
        { plan_name: planName, price, user_email: userEmail, provider: 'mercadopago' }
      ]);

      const preference = new Preference(client);
      const result = await preference.create({
        body: {
          items: [
            {
              id: planName.toLowerCase().replace(/\s+/g, '-'),
              title: `Assinatura MegaFoco - ${planName}`,
              unit_price: Number(price),
              quantity: 1,
              currency_id: 'BRL',
            }
          ],
          payer: {
            email: userEmail || 'comprador@email.com',
          },
          back_urls: {
            success: 'https://mpago.li/2FuQUyd',
            failure: 'https://mpago.li/2FuQUyd',
            pending: 'https://mpago.li/2FuQUyd',
          },
          auto_return: 'approved',
        }
      });

      res.json({ id: result.id, init_point: result.init_point });
    } catch (error) {
      console.error('Error creating MP preference:', error);
      res.status(500).json({ error: 'Erro ao processar pagamento' });
    }
  });

  // CRM Lead registration
  app.post('/api/leads', async (req, res) => {
    try {
      const { name, email, phone, source } = req.body;
      const { data, error } = await supabase.from('leads').insert([
        { name, email, phone, source, status: 'new' }
      ]).select();
      
      if (error) throw error;
      res.json(data[0]);
    } catch (error) {
      console.error('Error creating lead:', error);
      res.status(500).json({ error: 'Erro ao cadastrar lead' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
