#!/usr/bin/env node
/**
 * Post-generation script to fix compatibility issues in generated code
 * 1. Adds compatibility aliases to upsert schemas (prisma-zod-generator -> prisma-trpc-generator)
 * 2. Removes broken updateManyAndReturn procedures from routers
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Fix 1: Add upsert schema aliases
function fixUpsertSchemas() {
  const schemasDir = path.join(__dirname, '../src/generated/schemas');
  const pattern = path.join(schemasDir, 'upsertOne*.schema.ts');
  const files = glob.sync(pattern);

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const filename = path.basename(file);
    const modelName = filename
      .replace('upsertOne', '')
      .replace('.schema.ts', '');
    const aliasExport = `export const ${modelName}UpsertSchema = ${modelName}UpsertOneSchema;`;

    if (content.includes(aliasExport)) {
      return;
    }

    const updatedContent =
      content +
      `\n// Alias for prisma-trpc-generator compatibility\n${aliasExport}\n`;
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`✓ Added upsert alias to ${filename}`);
  });

  console.log(`Processed ${files.length} upsert schema files.\n`);
}

// Run all fixes
console.log('=== Fixing Generated Code ===\n');
fixUpsertSchemas();
// fixRouters();
console.log('=== All fixes complete! ===');
