# Vercel Deployment Guide

This guide shows how to deploy the Reddit scraper web app to Vercel using dotenvx for encrypted environment variables.

## Prerequisites

- Vercel account (free tier)
- GitHub repository pushed
- `.env.production` encrypted (already done ✅)
- `.env.keys` file locally (DO NOT COMMIT)

## Step 1: Get Your Decryption Key

The encrypted `.env.production` needs a decryption key. Get it from `.env.keys`:

```bash
grep "DOTENV_PRIVATE_KEY_PRODUCTION" .env.keys
```

Copy the value (without quotes):
```
af23a7daf13a8dffbc8fa75c928e3c7ae4ef2e5abc4e6ce7eb445e9eb3fa741a
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Set the decryption key**:
```bash
npx vercel env add DOTENV_PRIVATE_KEY_PRODUCTION
```
When prompted, paste the key value and select **Production** environment.

4. **Deploy**:
```bash
cd apps/web
vercel --prod
```

### Option B: Via Vercel Dashboard

1. **Import Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select `apps/web` as the root directory

2. **Configure Build Settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm db:generate:prod && cd apps/web && pnpm build`
   - **Install Command**: `cd ../.. && pnpm install`

3. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add: `DOTENV_PRIVATE_KEY_PRODUCTION` = `af23a7daf13a8dffbc8fa75c928e3c7ae4ef2e5abc4e6ce7eb445e9eb3fa741a`
   - Select: **Production** environment
   - Click **Save**

4. **Deploy**:
   - Click **Deploy**

## Step 3: Verify Deployment

After deployment completes:

1. Visit your deployed URL (e.g., `https://your-app.vercel.app`)
2. Check that the app loads
3. Test tRPC endpoints: `https://your-app.vercel.app/api/trpc/customPost.getAll`

## What Gets Deployed

✅ **Included** (Safe to commit):
- `.env.production` (encrypted - contains DATABASE_URL, etc.)
- All app code in `apps/web/`
- Generated tRPC routers in `apps/web/server/generated/`

❌ **Excluded** (Never commit):
- `.env.keys` (contains decryption keys)
- `.env` (local development)
- Docker files
- Backups

## Environment Variables in Production

Your `.env.production` contains (encrypted):
- `DATABASE_URL` - Supabase pooled connection (port 6543)
- `DIRECT_URL` - Supabase direct connection (port 5432)

Vercel automatically decrypts these at runtime using `DOTENV_PRIVATE_KEY_PRODUCTION`.

## Continuous Deployment

Once set up, every push to your main branch automatically deploys to Vercel.

## Troubleshooting

### Build fails with "Cannot find module"
- Check that `apps/web/vercel.json` has correct build command
- Ensure `pnpm install` runs from monorepo root

### Database connection fails
- Verify `DOTENV_PRIVATE_KEY_PRODUCTION` is set in Vercel
- Check Supabase database is accessible
- Verify `.env.production` has correct connection strings

### "Module not found: @/server"
- Ensure `apps/web/tsconfig.json` has correct paths configuration
- Run `pnpm db:generate:prod` locally to verify generated code

## Local Testing of Production Build

Test the production build locally before deploying:

```bash
cd apps/web
pnpm build  # Uses .env.production
pnpm start  # Runs production build
```

Visit `http://localhost:3000` to test.
