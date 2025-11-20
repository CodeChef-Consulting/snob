#!/bin/bash
# Run reply comment batches every 5 minutes until complete
# Continues running even on errors (e.g., API quota limits)

LIMIT=6000
INTERVAL=60  # 5 minutes
FAILURE_COUNT=0
MAX_FAILURES=30  # Stop after 10 consecutive failures

while true; do
  echo ""
  echo "==================================================================="
  echo "🔄 Starting batch at $(date)"
  echo "==================================================================="

  pnpm init-batch -- --comments --force-jsonl --sentiment --limit=$LIMIT

  if [ $? -ne 0 ]; then
    FAILURE_COUNT=$((FAILURE_COUNT + 1))
    echo ""
    echo "⚠️  Batch failed (failure $FAILURE_COUNT/$MAX_FAILURES)"

    if [ $FAILURE_COUNT -ge $MAX_FAILURES ]; then
      echo "❌ Too many consecutive failures - stopping"
      exit 1
    fi

    echo "   Continuing anyway (will retry after wait period)..."
  else
    # Reset failure count on success
    FAILURE_COUNT=0
  fi

  echo ""
  echo "⏳ Waiting $INTERVAL seconds before next batch..."
  sleep $INTERVAL
done
