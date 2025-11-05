# Analytics Demo

## Quick Start Guide

Get the analytics demo running in 5 minutes!

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Docker Services

```bash
docker-compose up -d
```

Wait 30 seconds for services to initialize.

### Step 3: Configure Umami

1. Visit **http://localhost:3002**
2. Login: `admin` / `umami`
3. Click **"Add Website"**
   - Name: `Analytics Demo`
   - Domain: `localhost`
4. Copy the **Website ID**
5. Update `.env`:
   ```
   VITE_UMAMI_WEBSITE_ID=your-website-id-here
   ```
6. Update `index.html` line 12 with the same ID

### Step 4: Configure GrowthBook

1. Visit **http://localhost:3100**
2. Create account (first user = admin)
3. Create project: `Analytics Demo`
4. Go to **SDK Connections** → **Add SDK Connection**
5. Copy the **Client Key**
6. Update `.env`:
   ```
   VITE_GROWTHBOOK_CLIENT_KEY=your-client-key-here
   ```

#### Create Features

**Feature: `hero-test`**

- Type: String
- Experiment: 2 variations (`control`, `variant`) at 50/50
- Toggle ON and Publish

#### Optional: Connect GrowthBook to Umami Database

For **automated statistical analysis** and real-time experiment results:

**See [docs/GROWTHBOOK_FACT_TABLE.md](./docs/GROWTHBOOK_FACT_TABLE.md)** for complete setup guide

This enables:

- Automated significance testing
- Bayesian analysis
- Confidence intervals
- Real-time conversion tracking
- Multi-metric funnel analysis

Quick setup:

1. Add PostgreSQL data source in GrowthBook (Settings → Data Sources)
2. Use connection: `host.docker.internal:5432` / `umami` / `umami` / `umami`
3. Follow the fact table guide to create metrics and experiments
4. View automated results with statistical significance!

### Step 5: Start the App

```bash
npm run dev
```

Visit **http://localhost:5173**

### What's Running?

- **Frontend**: http://localhost:5173
- **Umami**: http://localhost:3002
- **GrowthBook**: http://localhost:3100
- **PostgreSQL**: localhost:5432 (for GrowthBook SQL integration)

### Test the Funnel

1. Navigate: Home → Product → Cart → Checkout
2. Complete purchases in different browsers/incognito tabs
3. View event data in **Umami** (http://localhost:3002)
4. View experiment results in **GrowthBook** (http://localhost:3100) if SQL integration is configured

**Note:** A/B test variants are assigned per session (page load). Reload to see different variants. This is GDPR/ekomloven compliant - no persistent tracking.

### Funnel Events Tracked

- `hero_click_control` / `hero_click_variant` - Hero button clicked
- `page_view` - Page views
- `add_to_cart` - Add to cart clicked
- `checkout_start` - Checkout initiated
- `purchase_complete` - Purchase completed

### Documentation

- [GrowthBook Fact Table Integration](./docs/GROWTHBOOK_FACT_TABLE.md) - Complete guide to connect GrowthBook to Umami for automated A/B test analysis
