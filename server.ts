import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://ppndqeqmvrsyjceygejg.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbmRxZXFtdnJzeWpjZXlnamVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTgyNTcsImV4cCI6MjA5Mjc5NDI1N30.mlHV75k4YD4BTyhn2wz6sclZVhWy1m2GrKKpZ8GS6hk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjQyMzdkNjBhLTYxMWUtNGZmZi04MjFjLTFmMDg2N2Q0NWIyMTo6JGFhY2hfZWU0MjFhMWEtY2FmNy00MDBhLWI4YTQtMTJhMzNkNmUzMDhk';

// Initialize Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: MP_ACCESS_TOKEN
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mercado Pago Preference Route (for Checkout Pro)
  app.post('/api/create-preference', async (req, res) => {
    console.log('Received preference request:', req.body);
    try {
      const { planName, price, userEmail } = req.body;

      if (!planName || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Log attempt
      try {
        await supabase.from('checkout_attempts').insert([
          { plan_name: planName, price, user_email: userEmail, provider: 'mercadopago_preference' }
        ]);
      } catch (e) {
        console.warn('Log error:', e);
      }

      const preference = new Preference(client);
      const result = await preference.create({
        body: {
          items: [
            {
              id: planName.toLowerCase().replace(/\s+/g, '-'),
              title: `Plano ${planName} - MegaFoco Elite`,
              unit_price: Number(price),
              quantity: 1,
              currency_id: 'BRL',
            }
          ],
          payer: {
            email: userEmail || 'foconanoticiabr@gmail.com',
          },
          back_urls: {
            success: `${req.headers.origin}/success`,
            failure: `${req.headers.origin}/pricing`,
            pending: `${req.headers.origin}/pending`,
          },
          auto_return: 'approved',
          statement_descriptor: 'MEGAFOCO PDV',
        }
      });

      res.json({ id: result.id, init_point: result.init_point });
    } catch (error) {
      console.error('Preference error:', error);
      res.status(500).json({ 
        error: 'Erro ao criar preferência',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Mercado Pago PIX Payment Route (Direct PIX)
  app.post('/api/create-pix', async (req, res) => {
    console.log('Received PIX request:', req.body);
    try {
      const { planName, price, userEmail } = req.body;

      if (!planName || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const payment = new Payment(client);
      const result = await payment.create({
        body: {
          transaction_amount: Number(price),
          description: `Assinatura ${planName} - MegaFoco Elite`,
          payment_method_id: 'pix',
          payer: {
            email: userEmail || 'foconanoticiabr@gmail.com',
          }
        }
      });

      // Extract transaction data
      const transactionData = result.point_of_interaction?.transaction_data;
      
      res.json({
        id: result.id,
        qr_code: transactionData?.qr_code,
        qr_code_base64: transactionData?.qr_code_base64,
        ticket_url: transactionData?.ticket_url,
        status: result.status,
      });
    } catch (error) {
      console.error('PIX payment error:', error);
      res.status(500).json({ 
        error: 'Erro ao gerar PIX',
        details: error instanceof Error ? error.message : String(error)
      });
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

  // Server static files in production or use Vite in dev
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

