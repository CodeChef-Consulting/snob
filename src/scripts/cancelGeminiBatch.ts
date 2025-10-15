const batchId = process.argv[2];

if (!batchId) {
  console.error('Usage: npx tsx src/scripts/cancelGeminiBatch.ts <batchId>');
  console.error('Or: dotenvx run -- npx tsx src/scripts/cancelGeminiBatch.ts <batchId>');
  process.exit(1);
}

async function cancelBatch() {
  // Load environment variables
  const { config } = await import('@dotenvx/dotenvx');
  config();

  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY or GEMINI_API_KEY not found');
  }

  console.log(`Cancelling batch: ${batchId}`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/batches/${batchId}:cancel`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
    }
  );

  const result = await response.json();
  console.log('Result:', JSON.stringify(result, null, 2));

  if (!response.ok) {
    throw new Error(`API error: ${result.error?.message || 'Unknown error'}`);
  }
}

cancelBatch()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
