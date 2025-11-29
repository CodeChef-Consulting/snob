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
  // Support both old server location and new Next.js location
  const schemaDirs = [
    path.join(__dirname, '../../apps/server/src/generated/schemas'),
    path.join(__dirname, '../../apps/web/server/generated/schemas'),
  ];

  let totalFiles = 0;

  schemaDirs.forEach((schemasDir) => {
    if (!fs.existsSync(schemasDir)) {
      return;
    }

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

    totalFiles += files.length;
  });

  console.log(`Processed ${totalFiles} upsert schema files.\n`);
}

// Run all fixes
console.log('=== Fixing Generated Code ===\n');
fixUpsertSchemas();
// fixRouters();
console.log('=== All fixes complete! ===');
