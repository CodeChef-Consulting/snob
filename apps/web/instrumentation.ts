/**
 * Next.js instrumentation file - runs before the app starts
 * This loads and decrypts environment variables from .env.production
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { config } = await import('@dotenvx/dotenvx');
    const path = await import('path');

    const envPath = path.join(process.cwd(), '.env.production');

    const result = config({ path: envPath });

    if (result.error) {
      console.warn('⚠️  Failed to load .env.production:', result.error.message);
    } else {
      console.log('✓ Loaded environment variables from .env.production');
      console.log('  DATABASE_URL:', process.env.DATABASE_URL ? '✓ set' : '✗ not set');
      console.log('  DIRECT_URL:', process.env.DIRECT_URL ? '✓ set' : '✗ not set');
    }
  }
}
