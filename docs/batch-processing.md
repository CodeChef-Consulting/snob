# Batch Processing with JSONL

The batch processing system automatically uses JSONL format for large batches (>50,000 requests) to comply with Gemini's API limits.

## Overview

- **Small batches (≤50k)**: Uses inline request format
- **Large batches (>50k)**: Automatically switches to JSONL file format
- **Limits**: Up to 200,000 requests and 2GB file size

## How It Works

### 1. Initialize Batch

```bash
# Small batch (inline format)
npm run init-batch -- --posts --limit=1000

# Large batch (JSONL format)
npm run init-batch -- --posts --limit=75000
```

### 2. Automatic JSONL Processing

When a batch exceeds 50,000 items:

1. Script creates a JSONL file in `tmp/` directory
2. Each line contains a single JSON request object
3. File is uploaded to Google Cloud Storage via Gemini File API
4. Batch job is created referencing the GCS URI
5. Local JSONL file is automatically cleaned up

### 3. Check Results

```bash
# Check specific batch
npm run check-batch -- 123

# Poll until complete
npm run check-batch -- 123 --poll
```

When checking results from JSONL batches:
- Results are downloaded from GCS
- Each line is parsed and processed
- Progress logged every 1000 items (vs 100 for small batches)

## Configuration

Threshold can be adjusted in [initializeBatch.ts](../src/scripts/initializeBatch.ts):

```typescript
const JSONL_THRESHOLD = 50000; // Use JSONL for batches larger than this
```

## Technical Details

### File Format

JSONL file structure:
```json
{"request":{"contents":[{"parts":[{"text":"..."}],"role":"user"}]}}
{"request":{"contents":[{"parts":[{"text":"..."}],"role":"user"}]}}
```

### API Integration

```typescript
// JSONL batch creation
await ai.batches.create({
  model: 'gemini-2.5-flash',
  src: {
    format: 'jsonl',
    gcsUri: [fileUri]
  },
  config: {
    displayName: 'batch-name'
  }
});
```

### Result Retrieval

```typescript
// Download results from GCS
const resultFile = await ai.files.get({ name: gcsUri });
const response = await fetch(resultFile.uri);
const text = await response.text();
const lines = text.trim().split('\n');
```

## Benefits

1. **Higher throughput**: Process up to 200k items vs 50k inline limit
2. **Cost efficient**: Same 50% batch API discount
3. **Automatic**: No manual configuration needed
4. **Reliable**: Built-in cleanup and error handling

## Limitations

- Maximum 200,000 requests per batch
- Maximum 2GB file size
- Requires temporary disk space for JSONL file creation
- Network bandwidth for file upload/download
