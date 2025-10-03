#!/usr/bin/env node
/**
 * Post-generation script to add compatibility aliases to upsert schemas
 * This fixes the naming mismatch between prisma-zod-generator and prisma-trpc-generator
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const schemasDir = path.join(__dirname, '../src/generated/schemas');
const pattern = path.join(schemasDir, 'upsertOne*.schema.ts');

const files = glob.sync(pattern);

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  // Extract model name from filename (e.g., upsertOneComment.schema.ts -> Comment)
  const filename = path.basename(file);
  const modelName = filename.replace('upsertOne', '').replace('.schema.ts', '');

  // Check if alias already exists
  const aliasExport = `export const ${modelName}UpsertSchema = ${modelName}UpsertOneSchema;`;

  if (content.includes(aliasExport)) {
    console.log(`✓ Alias already exists in ${filename}`);
    return;
  }

  // Add alias export at the end of the file
  const updatedContent =
    content +
    `\n// Alias for prisma-trpc-generator compatibility\n${aliasExport}\n`;

  fs.writeFileSync(file, updatedContent, 'utf8');
  console.log(`✓ Added alias to ${filename}`);
});

console.log(`\nProcessed ${files.length} upsert schema files.`);
