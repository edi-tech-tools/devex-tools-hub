#!/usr/bin/env node
/**
 * Assemble all batch outputs into the final tools.ts file.
 * Finds the correct start/end markers for ALL_TOOLS array.
 */

const fs = require('fs');
const path = require('path');
const batsDir = path.join(__dirname, '..', 'scripts', 'batches');

// Read all batch files and sort numerically
const batchFiles = fs.readdirSync(batsDir)
  .filter(f => f.startsWith('batch') && f.endsWith('.txt'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/batch(\d+)/)[1]);
    const numB = parseInt(b.match(/batch(\d+)/)[1]);
    return numA - numB;
  });

console.log('Batch order:', batchFiles.map(f => f.match(/batch(\d+)/)[1]).join(', '));

let allContent = '';

for (const bf of batchFiles) {
  const content = fs.readFileSync(path.join(batsDir, bf), 'utf-8').trim();
  const parts = content.split('---TOKEN---');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed) {
      allContent += trimmed;
      allContent += ',\n';
    }
  }
}

// Remove trailing comma and newline  
allContent = allContent.replace(/,\n$/, '');

console.log(`Assembled ${batchFiles.length} batch files`);
console.log(`Total lines in data: ${allContent.split('\n').length}`);

// Read the original tools.ts
const toolsPath = path.join(__dirname, '..', 'app', 'data', 'tools.ts');
const original = fs.readFileSync(toolsPath, 'utf-8');

// Find start of ALL_TOOLS array
const startMarker = 'export const ALL_TOOLS: ToolData[] = [';
const startIdx = original.indexOf(startMarker);
if (startIdx === -1) throw new Error('Could not find start marker');

const afterStart = startIdx + startMarker.length;

// Find the TOOL_MAP line for the end boundary
const toolMapMarker = 'TOOL_MAP = new Map(ALL_TOOLS.map((t) => [t.id, t]));';
const toolMapIdx = original.indexOf(toolMapMarker, afterStart);
if (toolMapIdx === -1) throw new Error('Could not find TOOL_MAP marker');

// In the original, there's `];` on its own line between the last tool and TOOL_MAP
// Find the last occurrence of '];' before TOOL_MAP
const segment = original.substring(afterStart, toolMapIdx);
const lastArrayClose = segment.lastIndexOf('];');
if (lastArrayClose === -1) throw new Error('Could not find array close before TOOL_MAP');

// The array close includes '];'
const closeLen = 2;
const arrayEndEnd = afterStart + lastArrayClose + closeLen;

const before = original.substring(0, afterStart);
const after = original.substring(arrayEndEnd);

// Build the result: everything before the array, our new content, then the original closing
const result = before + '\n' + allContent + '\n' + after;

// Write result
fs.writeFileSync(toolsPath, result);
console.log(`Written ${result.length} bytes to ${toolsPath}`);

// Count tools
const idCount = (result.match(/^\s{2}id: /gm) || []).length;
console.log(`Tool count: ${idCount}`);

// Verify the end structure
const endCheck = result.slice(-300);
console.log('End of file:', JSON.stringify(endCheck.slice(-100)));
