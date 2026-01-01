// Analyze Excel files with multiple sheets
// Check structure and extract sheet names

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const STYLE_DATA_DIR = './STYLE_PRICING_DATA/Houspire-Individual Style Staging';

// Sample files to analyze
const sampleFiles = [
  'Modern Indian/Pooja Room.xlsx',
  'Modern Indian/Wardrobes-ModernIndian.xlsx',
  'Industrial/Living Room-Industrial.xlsx',
  'Art Deco/Kitchen-Art Deco.xlsx'
];

console.log('='.repeat(60));
console.log('EXCEL FILE STRUCTURE ANALYSIS');
console.log('='.repeat(60));

for (const file of sampleFiles) {
  const filePath = path.join(STYLE_DATA_DIR, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`\n❌ File not found: ${file}`);
    continue;
  }
  
  console.log(`\n📄 FILE: ${file}`);
  console.log('-'.repeat(60));
  
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    
    console.log(`Sheet Count: ${workbook.SheetNames.length}`);
    console.log(`Sheet Names: ${workbook.SheetNames.join(', ')}`);
    
    // Analyze each sheet
    workbook.SheetNames.forEach((sheetName, index) => {
      console.log(`\n  📊 SHEET ${index + 1}: "${sheetName}"`);
      
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (jsonData.length > 0) {
        console.log(`  Rows: ${jsonData.length}`);
        console.log(`  First 3 rows:`);
        jsonData.slice(0, 3).forEach((row: any, i: number) => {
          console.log(`    Row ${i + 1}:`, row.slice(0, 5), row.length > 5 ? '...' : '');
        });
        
        // Try to detect headers
        const headers = jsonData[0] as any[];
        if (headers && Array.isArray(headers)) {
          console.log(`  Detected Headers: ${headers.filter(h => h).join(' | ')}`);
        }
      } else {
        console.log(`  ⚠️ Empty sheet`);
      }
    });
    
  } catch (error) {
    console.log(`  ❌ Error reading file: ${error.message}`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('ANALYSIS COMPLETE');
console.log('='.repeat(60));
